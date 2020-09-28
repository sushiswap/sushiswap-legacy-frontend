import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useBento from './useBento'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getBentoMinerContract } from '../bento/utils'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bento = useBento()
  const bentoMinerContract = getBentoMinerContract(bento)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      bentoMinerContract,
      account,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, bentoMinerContract, lpContract])

  useEffect(() => {
    if (account && bentoMinerContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, bentoMinerContract, lpContract])

  return allowance
}

export default useAllowance
