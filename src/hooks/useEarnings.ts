import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import { getEarned } from '../sushi/utils'
import useBlock from './useBlock'

const useEarnings = (poolContract: Contract) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(poolContract, account)
    setBalance(new BigNumber(balance))
  }, [account, poolContract])

  useEffect(() => {
    if (account && poolContract) {
      fetchBalance()
    }
  }, [account, block, poolContract, setBalance])

  return balance
}

export default useEarnings
