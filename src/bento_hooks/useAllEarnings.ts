import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getBentoMinerContract, getFarms } from '../bento/utils'
import useBento from './useBento'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bento = useBento()
  const farms = getFarms(bento)
  const bentoMinerContract = getBentoMinerContract(bento)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(bentoMinerContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, bentoMinerContract, bento])

  useEffect(() => {
    if (account && bentoMinerContract && bento) {
      fetchAllBalances()
    }
  }, [account, block, bentoMinerContract, setBalance, bento])

  return balances
}

export default useAllEarnings
