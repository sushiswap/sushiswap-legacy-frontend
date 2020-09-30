import { useCallback } from 'react'

import useBento from './useBento'
import { useWallet } from 'use-wallet'

import { unstake, getBentoMinerContract } from '../bento/utils'
import { claimBento } from '../bento/utils'

const useClaimMinedToken = (pid: number) => {
  const { account } = useWallet()
  const bento = useBento()
  const bentoMinerContract = getBentoMinerContract(bento)

  const handleClaimMinedToken = useCallback(
    async (amount: string) => {
      const txHash = await claimBento(bentoMinerContract, account)
      console.log(txHash)
    },
    [account, pid, bento],
  )

  return { onClaimMinedToken: handleClaimMinedToken }
}

export default useClaimMinedToken
