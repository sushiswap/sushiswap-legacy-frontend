import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getBentoMinerContract } from '../bento/utils'
import useBento from './useBento'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const bento = useBento()
  const bentoMinerContract = getBentoMinerContract(bento)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(bentoMinerContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, bento])

  useEffect(() => {
    if (account && bento) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, bento])

  return balance
}

export default useStakedBalance
