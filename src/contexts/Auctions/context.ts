import { createContext } from 'react'
import { AuctionsContext } from './types'

const context = createContext<AuctionsContext>({
  auctions: [],
  unharvested: 0,
})

export default context
