import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getWethContract,
  getFarms,
  getTotalLPWethValue,
} from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const farms = getFarms(sushi)
  const wethContact = getWethContract(sushi)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          poolContract,
          lpContract,
          tokenContract,
        }: {
          poolContract: Contract,
          lpContract: Contract
          tokenContract: Contract
        }) =>
          getTotalLPWethValue(
            poolContract,
            wethContact,
            lpContract,
            tokenContract,
          ),
      ),
    )

    setBalance(balances)
  }, [account, sushi])

  useEffect(() => {
    if (account && sushi) {
      fetchAllStakedValue()
    }
  }, [account, block, setBalance, sushi])

  return balances
}

export default useAllStakedValue
