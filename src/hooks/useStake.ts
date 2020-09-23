import { useCallback } from 'react'
import { Contract } from 'web3-eth-contract'

import { useWallet } from 'use-wallet'

import { stake } from '../sushi/utils'

const useStake = (poolContract: Contract) => {
  const { account } = useWallet()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        poolContract,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, poolContract],
  )

  return { onStake: handleStake }
}

export default useStake
