import { useCallback } from 'react'

import useBento from './useBento'
import { useWallet } from 'use-wallet'

import { stake, getBentoMinerContract } from '../bento/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const bento = useBento()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getBentoMinerContract(bento),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, bento],
  )

  return { onStake: handleStake }
}

export default useStake
