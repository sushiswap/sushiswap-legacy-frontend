import { Contract } from 'web3-eth-contract'

export interface Auction {
  pid: number
  name: string
  lpToken: string
  lpTokenAddress: string
  lpContract: Contract
  tokenAddress: string
  earnToken: string
  earnTokenAddress: string
  icon: React.ReactNode
  id: string
  tokenSymbol: string
}

export interface AuctionsContext {
  auctions: Auction[]
  unharvested: number
}
