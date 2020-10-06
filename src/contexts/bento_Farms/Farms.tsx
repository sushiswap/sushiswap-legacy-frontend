import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useBento from '../../bento_hooks/useBento'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../sushi/utils'
import { getGovs } from '../../bento/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const bento = useBento()
  const { account } = useWallet()

  const farms = getGovs(bento)
  // const util = require('util')
  // console.log(`farms ${util.inspect(farms)}`)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
