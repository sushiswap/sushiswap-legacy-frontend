import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import { redeem } from '../bento/utils'

const useRedeem = (bentoMinerContract: Contract) => {
  const { account } = useWallet()

  const handleRedeem = useCallback(async () => {
    const txHash = await redeem(bentoMinerContract, account)
    console.log(txHash)
    return txHash
  }, [account, bentoMinerContract])

  return { onRedeem: handleRedeem }
}

export default useRedeem
