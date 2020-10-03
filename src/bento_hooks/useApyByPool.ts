import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getBentoMinerContract, getGovs, getApyByPool, getWethContract } from '../bento/utils'
import useBento from './useBento'
import useBlock from './useBlock'


interface Apy{
  icon: string,
  name: string,
  apy: BigNumber
}
const useApyByPool = () => {
  console.log('=================================')
  const [govsApy, setGovsApy] = useState([{} as Apy])
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bento = useBento()
  const bentoMinerContract = getBentoMinerContract(bento)
  const wethContract = getWethContract(bento)
  const block = useBlock()
  const govs = getGovs(bento)
  const BLOCKS_PER_YEAR = new BigNumber(2336000)

  const fetchAllGovsApy = useCallback(async () => {
    const govsApy = []
    govs.map(async (
      {
        tokenContract,
        govContract,
        lpContract,
        name,
        icon,
      }
    ) => {
      let govApy = await getApyByPool(
        tokenContract,
        bento,
        govContract,
        lpContract,
        wethContract,
        BLOCKS_PER_YEAR,
        account,
        name,
        icon,
      )
      govsApy.push(govApy)
    })

    setGovsApy(govsApy)
  }, [account, bentoMinerContract, bento])

  useEffect(() => {
    if (bentoMinerContract) {
      fetchAllGovsApy()
    }
  }, [account, block, bentoMinerContract, setGovsApy, bento])

  return govsApy
}

export default useApyByPool
