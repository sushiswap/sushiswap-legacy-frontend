import { useCallback } from 'react'

import useBento from './useBento'
import { useWallet } from 'use-wallet'

import { harvest, getBentoMinerContract } from '../bento/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const bento = useBento()
  const bentoMinerContract = getBentoMinerContract(bento)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(bentoMinerContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, bento])

  return { onReward: handleReward }
}

export default useReward
