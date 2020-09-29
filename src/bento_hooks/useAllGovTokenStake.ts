import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getBentoMinerContract, getGovTotalSupply, getGovs } from '../bento/utils'
import useBento from './useBento'
import useBlock from './useBlock'

export interface GovValue {
  name: string
  icon: string,
  size: number,
  govTotalStake: BigNumber,
}
const useAllGovTokenStake = () => {
  const iconSize = [85, 75, 65, 55, 47]
  const [govValues, setGovValues] = useState([] as Array<GovValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bento = useBento()
  const bentoMinerContract = getBentoMinerContract(bento)
  const block = useBlock()
  const govs = getGovs(bento)

  const fetchAllGovTotalSupply = useCallback(async () => {   
    let govValues: Array<GovValue> = await Promise.all(
      govs.map(
       async ({
          govContract,
          name,
          icon
        }: {
          govContract: Contract
          name: string
          icon: string
        }) =>
        {
          return {
            name,
            icon,
            govTotalStake: await getGovTotalSupply(govContract),
          }
        },
      ),
    )
    govValues.sort((gov1,gov2) => gov2.govTotalStake.toNumber() - gov1.govTotalStake.toNumber())
    govValues = govValues.map((gov, index) => {
        return {
          ...gov,
          size: index < 5 ? iconSize[index]: 36
        }
      })
    setGovValues(govValues)
  }, [account, bentoMinerContract, bento])

  useEffect(() => {
    if (bentoMinerContract) {
      fetchAllGovTotalSupply()
    }
  }, [account, block, bentoMinerContract, setGovValues, bento])

  return govValues
}

export default useAllGovTokenStake
