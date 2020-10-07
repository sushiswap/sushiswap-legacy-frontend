import { useCallback } from 'react'

import {Farm} from '../contexts/bento_Farms/types'

import useBento from './useBento'
import { useWallet } from 'use-wallet'

import { stake, getBentoMinerContract, approveGovToken } from '../bento/utils'

const useStake = (farm: Farm) => {
  const { account } = useWallet()
  const bento = useBento()

  const handleStake = useCallback(
    async (amount: string) => {

      return await stake(
        getBentoMinerContract(bento),
        amount,
        account,
      )
      .then((rst) => {
        return rst
      })
    },
    [account, farm, bento],
  )

  return { onStake: handleStake }
}

export default useStake
