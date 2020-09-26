import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { contractAddresses } from './lib/constants'

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

export const getMasterChefAddress = (sushi) => {
  return sushi && sushi.masterChefAddress
}
export const getSushiAddress = (sushi) => {
  return sushi && sushi.sushiAddress
}
export const getWethContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.weth
}

export const getMasterChefContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.masterChef
}
export const getSushiContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.sushi
}

export const getFarms = (sushi) => {
  return sushi
    ? sushi.contracts.pools.map(
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
          earnToken: 'sushi',
          earnTokenAddress: sushi.contracts.sushi.options.address,
          icon,
        }),
      )
    : []
}

export const getPoolWeight = async (masterChefContract, pid) => {
  const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterChefContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (masterChefContract, pid, account) => {
  return masterChefContract.methods.pendingSushi(pid, account).call()
}

export const getTotalLPWethValue = async (
  masterChefContract,
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
  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods
    .balanceOf(masterChefContract.options.address)
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
    poolWeight: await getPoolWeight(masterChefContract, pid),
  }
}

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const getSushiSupply = async (sushi) => {
  return new BigNumber(await sushi.contracts.sushi.methods.totalSupply().call())
}

export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (masterChefContract, pid, account) => {
  try {
    const { amount } = await masterChefContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (masterChefContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
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
export const getBentoTotalSupply = async (bentoken) => {
  bentoken.methods.totalSupply().call().then((rst) => {
    try {
      return new BigNumber(rst)
    } catch {
      return new BigNumber(0)
    }
  })
}

/**
 * 
 * @param {bentoMinerABI} BentoMiner 
 */
export const getGovTotalSupply = async (bentoMiner) => {
  let govTotalLocked, govTotalLockedF
  await bentoMiner.methods.totalLPTokensLocked().call().then((rst) => {

    govTotalLocked = rst / 10 ** 18
    try {
      govTotalLockedF = new BigNumber(rst)

    } catch{
      govTotalLockedF = new BigNumber(0)
    }

  })
  return { govTotalLockedF, govTotalLocked }
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
export const getMyBentoBalance = async (bentoken, account) => {
  let bento_balance
  bentoken.methods.balanceOf(account).call().then((rst) => {
    try {
      bento_balance = new BigNumber(rst)
    } catch{
      bento_balance = new BigNumber(0)
    }
  })
  return bento_balance
}

//食堂 - 获取便当info
export const getMyUnclaimBento = async (bentoMiner, account) => {
  let bento_unclaim
  bentoMiner.methods.unClaimedOf(account).call().then((rst) => {
    try {
      bento_unclaim = new BigNumber(rst)
    } catch{
      bento_unclaim = new BigNumber(0)
    }
  })

  return bento_unclaim
}

// 食堂 - 银行中的bento数量 (未添加)
export const getMyBentoInBank = async (miner, account) => {
  let bento_inBank
  miner.methods.bentosInBankOf(account).call().then((rst) => {
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

export const getGovLockedAmount = async(bentoMiner, account) => {
  let gov_locked, gov_lockedF
  bentoMiner.methods.lpTokensInBankOf(account).call().then((rst) => {
    gov_locked = rst / 10 ** 18
    try {
      gov_lockedF = new BigNumber(rst)
    } catch{
      gov_lockedF = new BigNumber(0)
    }
  })
  return {gov_locked, gov_lockedF}
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
export const claimBento= async(bentoMiner, account) => {
  await bentoMiner.methods.claim().send({ from: account }).then(() => {
      this.getMyUnclaimBento(bentoMiner, account)
      this.getMyBentoInBank(bentoMiner, account)
  })
}

/**
 * 食堂 - 领取 按钮
 * @param {*} bentoken 
 * @param {*} bentoMiner 
 * @param {*} account 
 * @param {ether} v_Bentos_withdraw 
 */
export const withdrawBento= async(bentoken, bentoMiner, account, v_Bentos_withdraw) => {
  bentoMiner.methods.withdrawBentos(v_Bentos_withdraw).send({ from: account }).then(() => {
      this.getMyUnclaimBento(bentoMiner, account)
      this.getMyBentoInBank(bentoMiner, account)
      this.getMyBentoBalance(bentoken, account)
  })
}

/**
 * 
 * @param {*} govtoken 
 * @param {*} account 
 * @param {*} amount 
 */
export const approveGovToken= async(govtoken, account, amount) => {
  govtoken.methods.approve(contractAddresses.bentoMiner, new BigNumber(amount)).send({ from: account }).then((rst) => {
      console.log('Approved receipt:', rst);
    })
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
export const withdrawGovToken= async(bentoMiner) => {
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