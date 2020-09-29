import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getBentoMinerContract } from '../bento/utils'
import useSushi from './useBento'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const bento = useSushi()
  const bentoMinerContract = getBentoMinerContract(bento)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(bentoMinerContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, bentoMinerContract, bento])

  useEffect(() => {
    if (account && bentoMinerContract && bento) {
      fetchBalance()
    }
  }, [account, block, bentoMinerContract, setBalance, bento])

  return balance
}

export default useEarnings
