import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useSushi from '../../hooks/useSushi'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../sushi/utils'
import { getFarms } from '../../sushi/utils'

import Context from './context'
import { Auction } from './types'

const Auctions: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const sushi = useSushi()
  const { account } = useWallet()

  const auctions = getFarms(sushi)
  console.log(`auctions ${auctions}`)

  return (
    <Context.Provider
      value={{
        auctions,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Auctions
