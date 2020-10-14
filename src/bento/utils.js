import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { contractAddresses } from './lib/constants'
import Web3 from 'web3'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getBentoMinerAddress = (bento) => {
  return bento && bento.bentoMinerAddress
}
export const getBentoAddress = (bento) => {
  console.log('bento.bentoAddress: ', bento)
  return bento && bento.bentoAddress
}
export const getWethContract = (bento) => {
  return bento && bento.contracts && bento.contracts.weth
}

export const getBentoMinerContract = (bento) => {
  return bento && bento.contracts && bento.contracts.bentoMiner
}
export const getBentoContract = (bento) => {
  return bento && bento.contracts && bento.contracts.bento
}

export const getFarms = (bento) => {
  return bento
    ? bento.contracts.pools.map(
      ({
        pid,
        name,
        symbol,
        icon,
        tokenAddress,
        tokenSymbol,
        tokenContract,
        lpAddress,
        lpContract,
      }) => ({
        pid,
        id: symbol,
        name,
        lpToken: symbol,
        lpTokenAddress: lpAddress,
        lpContract,
        tokenAddress,
        tokenSymbol,
        tokenContract,
        earnToken: 'bento',
        earnTokenAddress: bento.contracts.bento.options.address,
        icon,
      }),
    )
    : []
}

export const getGovs = (bento) => {
  return bento
    ? bento.contracts.pools.map(
      ({
        pid,
        name,
        symbol,
        icon,
        tokenAddress,
        tokenSymbol,
        tokenContract,
        lpAddress,
        lpContract,
        govAddress,
        govContract,
        originalGovContract,
        originalGovAddress,
      }) => ({
        pid,
        id: symbol,
        name,
        govToken: symbol,
        govAddress,
        govContract,
        lpContract,
        lpAddress,
        tokenAddress,
        tokenSymbol,
        tokenContract,
        originalGovContract,
        originalGovAddress,
        earnToken: 'bento',
        earnTokenAddress: bento.contracts.bento.options.address,
        icon,
      }),
    )
    : []
}

export const getPoolWeight = async (bentoMinerContract, pid) => {
  const { allocPoint } = await bentoMinerContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await bentoMinerContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (bentoMinerContract, pid, account) => {
  return bentoMinerContract.methods.pendingBento(pid, account).call()
}



export const getTotalLPWethValue = async (
  bentoMinerContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that bentoMinerContract owns
  const balance = await lpContract.methods
    .balanceOf(bentoMinerContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total weth value for the lpContract = w1
  const lpContractWeth = await wethContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))
  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(bentoMinerContract, pid),
  }
}

export const approve = async (lpContract, bentoMinerContract, account) => {
  return lpContract.methods
    .approve(bentoMinerContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const getBentoSupply = async (bento) => {
  return new BigNumber(await bento.contracts.bento.methods.totalSupply().call())
}

export const stake = async (bentoMinerContract, amount, account) => {
  return bentoMinerContract.methods
    .deposit(
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (bentoMinerContract, amount, account) => {
  return bentoMinerContract.methods
    .claimAllBentoAndWithdrawGovs(
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (bentoMinerContract, pid, account) => {
  return bentoMinerContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (bentoMinerContract, pid, account) => {
  try {
    const { amount } = await bentoMinerContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (bentoMinerContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return bentoMinerContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}


// =========================bento Web3方法 ==================
/**
 * 
 * @param {bentoABI} bentoken 
 */
export const getBentoTotalSupply = async (bento) => {
  return new BigNumber(await bento.contracts.bento.methods.totalSupply().call())
}

/**
 * 获得销毁的bento数量
 * @param {*} bento 
 */
export const getBentoTotalBurned = async (bento) => {
  return new BigNumber(await bento.contracts.bento.methods.totalBurned().call())
}

/**
 * 
 * @param {bentoMinerABI} BentoMiner 
 */
export const getGovTotalSupply = async (bentoMiner) => {
  return new BigNumber(await bentoMiner.methods.totalGovTokensLocked().call())
}

/**
 * 
 * @param {bentoABI} bentoken 
 * @param {network id} chainId 
 */
export const getWeigthInfo = async (bentoken, chainId) => {
  let totalPoolWeight, poolWeight
  await bentoken.methods.getUnionWeight(contractAddresses.bentoMiner[chainId]).call().then((rst) => {
    totalPoolWeight = rst[1]
    poolWeight = rst[0]
  })
  return { totalPoolWeight, poolWeight }
}

/**
 * 
 * @param {bentoABI} bentoken 
 * @param {current account} account 
 */
export const getMyBentoBalance = async (bento, account) => {
  return new BigNumber(await bento.contracts.bento.methods.balanceOf(account).call())

}

//食堂 - 获取便当info
export const getMyUnclaimBento = async (bentoMiner, account) => {
  let bento_unclaim
  await bentoMiner.contracts.bentoMiner.methods.unClaimedOf(account).call().then((rst) => {
    const util = require('util')
    console.log(`bento ${util.inspect(rst)}`)
    try {
      bento_unclaim = new BigNumber(rst)
    } catch{
      bento_unclaim = new BigNumber(0)
    }
  })

  return bento_unclaim
}

// 食堂 - 银行中的bento数量 (未添加)
export const getMyGovTokens = async (miner, account) => {
  let bento_inBank
  miner.methods.player2GovTokens(account).call().then((rst) => {
    try {
      bento_inBank = new BigNumber(rst)
    } catch{
      bento_inBank = new BigNumber(0)
    }
  })
  return bento_inBank
}

//食堂 - 正在挖矿
export const getGovBalance = async (govtoken, account) => {
  let gov_balance
  govtoken.methods.balanceOf(account).call().then((rst) => {
    try {
      gov_balance = new BigNumber(rst)
    } catch{
      gov_balance = new BigNumber(0)
    }
  })
  return gov_balance
}

/**
 * getGovTokensLockInBento
* @param {} bentoMiner 
 * @param {*} account 
 */
export const playerToGovTokens = async (bentoMiner, account) => {
  let gov_locked

  gov_locked = await bentoMiner.methods.playerToGovTokens(account).call()
  console.log(`gov_locked ${gov_locked}`)
  if (gov_locked) {
    return new BigNumber(gov_locked)
  } else {
    return new BigNumber(0)
  }
}

/**
 * 
 * @param {*} gov_locked 
 * @param {*} govTotalLocked 
 * @param {*} poolWeight 
 * @param {*} totalPoolWeight 
 */
export const getBentoMiningSpeed = (gov_locked, govTotalLocked, poolWeight, totalPoolWeight) => {
  //首先获取个人LP数量，获取总LP数量，获取当前池子权重比
  // BentoMiner.methods.totalLPTokensLocked().call().then(rst)

  const bento_miningSpeed = ((gov_locked / govTotalLocked) * (poolWeight / totalPoolWeight)) * 64
  console.log(gov_locked, govTotalLocked, poolWeight, totalPoolWeight)
  return bento_miningSpeed
}

/**
 * 
 * @param {*} gov_locked 
 * @param {*} govTotalLocked 
 */
export const getMyMiningPercentage = (gov_locked, govTotalLocked) => {
  const gov_percentage = (gov_locked * 100 / govTotalLocked)
  return gov_percentage
}

// 食堂 - (未添加) 声明便当按钮
export const claimBento = async (bentoMiner, account) => {
  console.log(`claim bento ${account}`)
  await bentoMiner.methods.claim().send({ from: account }).then(() => {
    // this.getMyUnclaimBento(bentoMiner, account)
    // this.getMyBentoInBank(bentoMiner, account)
    console.log(`claimBento successfully`)
  })
}

/**
 * 食堂 - 领取 按钮
 * @param {*} bentoken 
 * @param {*} bentoMiner 
 * @param {*} account 
 * @param {ether} v_Bentos_withdraw 
 */
export const withdrawBento = async (bentoken, bentoMiner, account, v_Bentos_withdraw) => {
  bentoMiner.methods.withdrawBentos(v_Bentos_withdraw).send({ from: account }).then(() => {
    getMyUnclaimBento(bentoMiner, account)
    //getMyBentoInBank(bentoMiner, account)
    getMyBentoBalance(bentoken, account)
  })
}

/**
 * 
 * @param {*} govtoken 
 * @param {*} account 
 * @param {*} amount 
 */

// export const approveGovToken = async (tokenContract, govAddress, account, amount) => {
//   await tokenContract.methods.approve(govAddress, ethers.constants.MaxUint256).send({ from: account }).then((rst) => {
//     console.log('Approved receipt:', rst);
//   })
export const approveGovToken = async (tokenContract, govAddress, account, amount) => {
  return tokenContract.methods
    .approve(govAddress, new BigNumber(amount).times(new BigNumber(10).pow(18)))
    .send({ from: account })
    .then((rst) => {
      console.log('Approved receipt:', rst);

      return true
    })
    .catch((e) => {
      console.log(`failed to approve ${e} amount ${amount} govtoken ${govAddress} account ${account}`)
      return false
    })
}


/**
 * 
 * @param {gov token contract} govTokenContract 
 * @param {gov lp token contract} lpContract 
 * @param {*} wethContract 
 */
export const getGovPriceInWeth = async (tokenContract, lpContract, wethContract
) => {

  const govTokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address).call()

  console.log('govTokenAmountWholeLP:', govTokenAmountWholeLP)

  const tokenDecimals = await tokenContract.methods.decimals().call()

  console.log('tokenDecimals:', tokenDecimals)

  const govAmount = new BigNumber(govTokenAmountWholeLP)
    .div(new BigNumber(10).pow(tokenDecimals))

  console.log('govAmount:', govAmount.toNumber())

  const wethAmountWholeLP = await wethContract.methods
    .balanceOf(lpContract.options.address).call()

  console.log('wethAmountWholeLP:', wethAmountWholeLP)

  const wethAmount = new BigNumber(wethAmountWholeLP)
    .div(new BigNumber(10).pow(18))
  return wethAmount.div(govAmount)
}

export const getBentoPriceInWeth = async (
  bento,
  lpContract,
  wethContract,
) => {
  return await getGovPriceInWeth(bento, lpContract, wethContract)
}

// export const getUnionWeight = async(bento, govToken) => {
//    return await bento.contracts.bento.methods.getUnionWeight(govToken.options.address).call()
// }

export const getApyByPool = async (
  tokenContract,
  bento,
  govContract,
  lpContract,
  wethContract,
  blocksInYear,
  account,
  name,
  icon,
) => {

  const govPrice = await getGovPriceInWeth(tokenContract, lpContract, wethContract)


  const govAmount = await totalGovTokensLocked(govContract)


  const bentoPrice = await getBentoPriceInWeth(bento.contracts.bento, bento.contracts.bentoLP, wethContract)


  const bp = await getBentoProduction(bento.contracts.bento, govContract)

  if (!validateBigNumbers(govPrice, govAmount, bentoPrice, bp)) {
    return {
      icon,
      name,
      apy: new BigNumber(0),
    }
  }

  const apy = bp.times(new BigNumber(blocksInYear))
    .times(bentoPrice)
    .div(govPrice.times(govAmount))
  return {
    icon,
    name,
    apy: apy,
  }
}

const validateBigNumbers = (...arr) => {
  let flag = true
  for (let i in arr) {
    if (arr[i].isNaN() || arr[i].isNegative() || arr[i].isZero()) {
      flag = false
      break
    }
  }
  return flag
}

export const getBentoProduction = async (bentoMiner, govContract) => {
  let bp = await bentoMiner.methods.bentoProduction(govContract.options.address).call()
  if (bp) {
    return new BigNumber(bp)
  } else {
    return new BigNumber(0)
  }
}

export const totalGovTokensLocked = async (bentoMiner) => {
  let total = await bentoMiner.methods.totalGovTokensLocked().call()
  if (total) {
    return new BigNumber(total)
  } else {
    return new BigNumber(0)
  }
}


// export const depositGovTokenToMine= async() => {
//   // web3.toWei(this.v_Naps, "ether")
//   if (this.v_Govs_deposit < 10) {
//       alert('Amount at least than 10.');
//       return;
//   }
//   BentoMiner.methods.deposit(web3.toWei(this.v_Govs_deposit, "ether")).send({ from: web3.eth.defaultAccount }).then((rst) => {
//       console.log('Deposit Gov receipt:', rst);
//       this.refreshAll();
//       this.delyRefresh();
//       try {
//         gov_lockedF = new BigNumber(rst)
//       } catch{
//         gov_lockedF = new BigNumber(0)
//       }
//     })
//     return {gov_locked, gov_lockedF}
// }
/**
 * 食堂 - 取回治理代币按钮
 * 
 * web3.toWei(this.v_Govs_withdraw, "ether")
 * 
 */
export const withdrawGovToken = async (bentoMiner) => {
  // bentoMiner.methods.withdraw(web3.toWei(this.v_Govs_withdraw, "ether")).send({ from: web3.eth.defaultAccount }).then((rst) => {
  //     console.log('Withdraw Gov receipt:', rst);
  //     this.refreshAll();
  //     this.delyRefresh();
  //     try {
  //       gov_lockedF = new BigNumber(rst)
  //     } catch{
  //       gov_lockedF = new BigNumber(0)
  //     }
  //   })
  //   return {gov_locked, gov_lockedF}
}

/**
 * 未添加方法:
 * 获得对某提案投票的便当总数
 * 参数 id
 *
 * function getVoteObjectInfo(uint256 _proposalid)
        external
        view
        returns (
            address originator,
            bool voteResult,
            uint32 endAtBlockNumber,
            uint112 nowBentosInVote, //总数
            uint256 trueOptionVotes,
            uint256 falseOptionVotes,
            voteState stateNow
        )

 */
export const getVoteObjectInfo = async (govContract, pid) => {
  let vote = await govContract.methods.getVoteObjectInfo(pid).call()
  return vote
}

export const getCastingVoteByContract = async (govContract, block) => {

  // get voteCreate Events
  const votesCreatedStream = await govContract.getPastEvents('voteCreated', { fromBlock: 0, toBlock: 'latest' })
  let votesCreated = votesCreatedStream.filter(
    (event) => event.returnValues && event.returnValues.endAtBlockNumber > block
  ).map(
    (event) => {
      return event.returnValues
    }
  )
  console.log('votesCreated:', votesCreated)
  // get vote object
  votesCreated = await Promise.all(votesCreated.map(async (vote) => {
    let _vote = getVoteObjectInfo(govContract, vote.Proposalid)
    return {
      proposal_id: vote.Proposalid,
      originator: _vote.Originator,
      endAtBlockNumber: _vote.endAtBlockNumber,
      nowBentosInVote: _vote.nowBentosInVote ? new BigNumber(_vote.nowBentosInVote) : new BigNumber(0),
      trueoptionVotes: _vote.trueoptionVotes,
      falseOptionVotes: _vote.falseOptionVotes,
      stateNow: _vote.stateNow,
    }
  }))

  return votesCreated


}

//test castvote
export const govCastVote = async (bentoMiner, id, account) => {
  //get bentoMiner
  return await bentoMiner.methods.castVote(id, true).send({ from: account })
}

//test launchvote
export const govLaunchVote = async (bento, id, account) => {
  let height = await bento.web3.eth.getBlockNumber()
  return await bento.contracts.bentoMiner.methods.launchVote(id, height).send({ from: account })
}

export const depositBento2Miner = async (bento, amount, account) => {
  const bentoMiner = getBentoMinerContract(bento)
  let rlog
  rlog = await bento.contracts.bento.methods.approve(
    bentoMiner.options.address,
    ethers.constants.MaxUint256)
    .send({ from: account })
  console.log('approve log:', rlog)
  rlog = await bentoMiner.methods.deposit(amount).send({ from: account })
  console.log('deposit log:'.rlog)
}

/**
 * get govContract voteCreated event
 * @param {*} govContract 
 * @param {*} block 
 */
export const getVoteCreatedEvent = async(govContract, block) => {
  const votesCreatedStream = await govContract.getPastEvents('voteCreated', { fromBlock: 0, toBlock: 'latest' })
  let votesCreated = votesCreatedStream.filter(
    (event) => event.returnValues && event.returnValues.endAtBlockNumber > block
  ).map(
    (event) => {
      return event.returnValues
    }
  )
  return votesCreated
}

// export const getProposalByGov = async (gov, block) => {
//   // 1. get voteCreate Events
//   const govContract = gov.govContract
//   const votesCreatedStream = await govContract.getPastEvents('voteCreated', { fromBlock: 0, toBlock: 'latest' })
//   let votesCreated = votesCreatedStream.filter(
//     (event) => event.returnValues && event.returnValues.endAtBlockNumber > block
//   ).map(
//     (event) => {
//       return event.returnValues
//     }
//   )
//   // 2. get govToken proposal
//   let proposals = getProposals(gov, block)
//   proposals = proposals.filter( p => {
//     let flag = false
//     for(let i in votesCreated){
//       if(votesCreated[i].id === p.id){
//           flag = true
//           break
//       }
//     }
//     return flag
//   })
// }
/**
 * get proposals event by gov
 * @param {*} gov 
 * @param {*} block 
 */
export const getProposalsEvent = async (originalGovContract, name, block) => {
  let result = []
  switch (name) {
    case 'COMP':
      result = await _getCompoundProposal(originalGovContract, block)
      break;

    default:
      break;
  }

  return result
}

// get comp proposal
const _getCompoundProposal = async (compGovContract, block) => {
  let result
  //fromBlock: block - 17280 - 5000
  result = await compGovContract.getPastEvents('ProposalCreated', { fromBlock: 0, toBlock: 'latest' })
  console.log('getPastEvents result:', result)
  result = result.map((event) => event.returnValues)
  // await Promise.all(result.filter(async (proposal) => {
  //     let state
  //     state = await compGovContract.methods.state(proposal.id).call()
  //     if (state === 'Active' || state === 'Pending') {
  //       return true
  //     }
  //     return false
  //   })
  // )
  return result
}