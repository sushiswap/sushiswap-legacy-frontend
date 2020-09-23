import { useCallback } from 'react'

import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve } from '../sushi/utils'

const useApprove = (lpContract: Contract, poolContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, poolContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, poolContract])

  return { onApprove: handleApprove }
}

export default useApprove
