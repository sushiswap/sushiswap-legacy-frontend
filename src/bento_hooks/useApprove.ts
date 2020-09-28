import { useCallback } from 'react'

import useBento from './useBento'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getBentoMinerContract } from '../bento/utils'

const useApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bento = useBento()
  const bentoMinerContract = getBentoMinerContract(bento)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, bentoMinerContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, bentoMinerContract])

  return { onApprove: handleApprove }
}

export default useApprove
