import { useCallback } from 'react'

import useBento from './useBento'
import { useWallet } from 'use-wallet'

import { unstake, getBentoMinerContract } from '../bento/utils'
import { Farm } from '../contexts/bento_Farms/types'

const useUnstake = (farm: Farm) => {
  const { account } = useWallet()
  const bento = useBento()
  const util = require('util')
  console.log(`contract is , ${util.inspect(getBentoMinerContract(bento))}`)

  const handleUnstake = useCallback(
    async (amount: string) => {
      return await unstake(
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

  return { onUnstake: handleUnstake }
}

export default useUnstake
