import { useCallback } from 'react'
import { Contract } from 'web3-eth-contract'
import {Farm} from '../contexts/bento_Farms/types'
import useBento from './useBento'
import { useWallet } from 'use-wallet'

import { stake, getBentoMinerContract, approveGovToken } from '../bento/utils'

const useStake = (farm: Farm) => {
  const { account } = useWallet()
  const bento = useBento()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHashApprove = await approveGovToken(farm.tokenContract, farm.govAddress, account, -1)
      const txHash = await stake(
        getBentoMinerContract(bento),
        0,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, farm, bento],
  )

  return { onStake: handleStake }
}

export default useStake
