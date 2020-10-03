import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getBentoMinerContract, playerToGovTokens } from '../bento/utils'
import useBento from './useBento'
import useBlock from './useBlock'

const useGovTokenStake = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bento = useBento()
  const bentoMinerContract = getBentoMinerContract(bento)
  const block = useBlock()

  const fetchGovTotalSupply = useCallback(async () => {
    const balance = await playerToGovTokens(bentoMinerContract, account)
    setBalance(balance)
  }, [account, bentoMinerContract, bento])

  useEffect(() => {
    if (bentoMinerContract) {
      fetchGovTotalSupply()
    }
  }, [account, block, bentoMinerContract, setBalance, bento])

  return balance
}

export default useGovTokenStake
