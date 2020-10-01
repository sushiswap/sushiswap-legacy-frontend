import { useContext } from 'react'
import { Context as AuctionContext } from '../contexts/Auctions'

const useAuctions = () => {
  const { auctions } = useContext(AuctionContext)
  return [auctions]
}

export default useAuctions
