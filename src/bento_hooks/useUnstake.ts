import { useCallback } from 'react'

import useBento from './useBento'
import { useWallet } from 'use-wallet'

import { unstake, getBentoMinerContract } from '../bento/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const bento = useBento()
  const bentoMinerContract = getBentoMinerContract(bento)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(bentoMinerContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, bento],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
