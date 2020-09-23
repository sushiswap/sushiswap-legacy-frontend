import { Contract } from 'web3-eth-contract'

export interface Farm {
  name: string
  lpToken: string
  lpTokenAddress: string
  lpContract: Contract
  poolContract: Contract
  tokenAddress: string
  earnToken: string
  earnTokenAddress: string
  icon: React.ReactNode
  id: string
  tokenSymbol: string
}

export interface FarmsContext {
  farms: Farm[]
  unharvested: number
}
