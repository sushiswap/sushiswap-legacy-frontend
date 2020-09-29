import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getBentoMinerContract, getBentoTotalSupply } from '../bento/utils'
import useBento from './useBento'
import useBlock from './useBlock'

const useBentoSupply = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const bento = useBento()
  const bentoMinerContract = getBentoMinerContract(bento)
  const block = useBlock()

  const fetchSupply = useCallback(async () => {
    const balance = await getBentoTotalSupply(bento)
    console.log('balancebalancebalance:', balance.toNumber())
    setBalance(balance)
  }, [account, bentoMinerContract, bento, ethereum])

  useEffect(() => {
    if (account && bentoMinerContract && bento) {
      fetchSupply()
    }
  }, [account, block, bentoMinerContract, setBalance, bento, ethereum])

  return balance
}

export default useBentoSupply
