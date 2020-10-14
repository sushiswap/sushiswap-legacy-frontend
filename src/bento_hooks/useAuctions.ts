import { useCallback, useEffect, useState, useRef } from 'react'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getProposalsEvent, getVoteCreatedEvent, getGovs, totalGovTokensLocked, getVoteObjectInfo } from '../bento/utils'
import useBento from './useBento'
import useBlock from './useBlock'

export interface Auction {
  auctionName: string
  proposalDescription: string
  Proposer: string
  proposalStartBlock: number
  proposalEndBlock: number
  totalVotes: BigNumber
  totalBentoInVote: BigNumber
  endAtBlockNumber: number
  auctionForVotes: number
  auctionAgainstVotes: number
  auctionState: number
  auctionResult: boolean
  auctionOriginator: string
}
const useAuctions = () => {
  // const _isMounted = useRef(true);
  const [auctions, setAuctions] = useState([] as Array<Auction>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bento = useBento()
  const block = useBlock()
  const govs = getGovs(bento)

  const fetchAuctions = useCallback(async () => {
    // if(!_isMounted.current) return
    let auctions: Array<Auction> = await Promise.all(
      govs.filter( gov => gov.pid !== 0)
      .map(
        async ({
          govContract,
          originalGovContract,
          name,
          icon
        }) => {
          //@ts-ignore
          const _block = await bento.web3.eth.getBlockNumber()
          console.log('_block:', _block)
          const votes = await getVoteCreatedEvent(govContract, _block)
          console.log('votes:', votes)
          const totalVotes = await totalGovTokensLocked(govContract)
          console.log('totalVotes:', totalVotes)
          let proposals = await getProposalsEvent(originalGovContract, name, _block)
          console.log('proposals:', proposals)
          proposals = proposals.filter( p => {
            let flag = false
            for(let i in votes){
              if(votes[i].Proposalid === p.id){
                  flag = true
                  break
              }
            }
            return flag
          })

          console.log('proposals:', proposals)
          
          const _auctions = Promise.all(proposals.map( async(p, i) => {
            let auction
            const voteInfo = await getVoteObjectInfo(govContract, votes[i].Proposalid)
            auction= {
              auctionName: `${name} ${p.id}`,
              proposalDescription: p.description,
              Proposer: p.proposer.toString(),
              proposalStartBlock: p.startBlock,
              proposalEndBlock: p.endBlock,
              totalVotes: totalVotes,
              totalBentoInVote: voteInfo.nowBentosInVote,
              endAtBlockNumber: votes[i].endAtBlockNumber - _block,
              auctionForVotes: voteInfo.trueOptionVotes? voteInfo.trueOptionVotes: 0,
              auctionAgainstVotes: voteInfo.falseOptionVotes? voteInfo.falseOptionVotes: 0,
              auctionState: voteInfo.stateNow,
              auctionResult: voteInfo.voteResult,
              auctionOriginator: voteInfo.originator.toString(),
            }
            console.log('auctionForVotes:', auction.auctionForVotes)
            console.log('auctionAgainstVotes:', auction.auctionAgainstVotes)
            console.log('height :', `${
              (auction.auctionForVotes
              /(auction.auctionForVotes + auction.auctionAgainstVotes)
              *100)
              .toLocaleString('en-US')
              .slice(0, -1)
              }%`)
            return auction
          }))


          return _auctions
        },
      ),
    )
   
    setAuctions(auctions.flat())
  }, [account, bento, setAuctions])

  useEffect(() => {
    if (bento) {
      console.log('bento:', bento)
      fetchAuctions()
    }
    // return () => {
    //   _isMounted.current = false
    // }
  }, [account, block, bento])

  return auctions
}

export default useAuctions
