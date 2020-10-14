import BigNumber from 'bignumber.js'
import React, { useEffect, useState, useCallback } from 'react'
import CountUp from 'react-countup'
import styled, { AnyStyledComponent } from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import BentoIcon from '../../../components/BentoIcon'
import useBentoSupply from '../../../bento_hooks/useBentoSupply'
import usePendingRewards from '../../../bento_hooks/usePendingRewards'
import useAllGovTokenStake from '../../../bento_hooks/useAllGovTokenStake'
import useBlock from '../../../bento_hooks/useBlock'
import { default as useVotes, IVote } from '../../../bento_hooks/useVotes'
import useBentoBalance from '../../../bento_hooks/useBentoBalance'
import useGovTokenStake from '../../../bento_hooks/useGovTokenStake'
import useBentoTotalBurned from '../../../bento_hooks/useBentoTotalBurned'
import useAllStakedValue from '../../../bento_hooks/useAllStakedValue'
import useFarms from '../../../bento_hooks/useFarms'
import useTokenBalance from '../../../bento_hooks/useTokenBalance'
import useBento from '../../../bento_hooks/useBento'
import { getBentoAddress, getBentoSupply } from '../../../bento/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { useI18n } from 'use-i18n'
import Button from '../../../components/Button'
import Logo from '../../../components/Logo'
import { govCastVote, getBentoMinerContract, getCastingVoteByContract, govLaunchVote, depositBento2Miner } from '../../../bento/utils'
const PendingRewards: React.FC = () => {
  const t = useI18n()
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const pendingRewards = getBalanceNumber(usePendingRewards())

  useEffect(() => {
    setStart(end)
    setEnd(pendingRewards)
  }, [pendingRewards])

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      {/* supply数字增长效果 */}
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}

const Balances: React.FC = () => {

  const t = useI18n()
  const [pid, setPid] = useState(0)
  const [depositAmount, setDepositAmount] = useState(0)
  const block = useBlock()
  const bento = useBento()
  const bentoMiner = getBentoMinerContract(bento)
  const bentoBalance = useBentoBalance()
  //const bentoBurned = useBentoTotalBurned()
  //console.log('bentoBurned:', bentoBurned.toNumber())
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()
  const start = 0
  const end = 9837284.478278
  const totalSupply = useBentoSupply()
  // const napSupply = useGovTokenStake()
  const govRows = useAllGovTokenStake()
  const votes = useVotes()
  const [val, setVal] = useState('')
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )


  return (
    <>
      <StyledWrapper>
        <Card>
          <CardContent>
            <StyledBalances>
              {/* <BentoIcon /> */}
              {/* <Spacer /> */}
              <div style={{ flex: 1 }}>
                <Label text={t.bentoBalance} />
                <Value
                  value={!!account ? getBalanceNumber(bentoBalance) : t.locked}
                />
              </div>
              <ButtonStyle>
                <Button text={`${t.mining}`} to="/farms" variant="default" size="md" />
              </ButtonStyle>
            </StyledBalances>
          </CardContent>
          <Footnote>
            {t.pending}
            <FootnoteValue>
              <PendingRewards /> BENTO
          </FootnoteValue>
          </Footnote>
        </Card>
        <Spacer />

        <Card>
          <CardContent>
            <StyledBalances>
              <div style={{ flex: 1 }}>
                <Label text={t.bentoSupply} />
                <Value
                  value={totalSupply.toNumber() ? getBalanceNumber(totalSupply) : t.locked}
                />
              </div>
              <ButtonStyle>
                <Button text={`${t.buy}`} href="https://app.uniswap.org/#/swap" variant="default" size="md" />
              </ButtonStyle>
            </StyledBalances>
          </CardContent>
          <Footnote>
            {t.newRewards}
            <FootnoteValue>64 BENTO</FootnoteValue>
          </Footnote>
        </Card>
      </StyledWrapper>

      <Spacer size="lg" />

      <StyledWrapper>
        <Card>
          <CardContent>
            <StyledBalances>

              <div style={{ flex: 1 }}>
                <StyledTitle>
                  <Label text={t.votingPower} />
                </StyledTitle>

              </div>

            </StyledBalances>
            <StyledPools>

              {govRows.map((farm, j) => (
                <React.Fragment key={j}>
                  <Pool name={farm.name} size={farm.size} govTotalStake={getBalanceNumber(farm.govTotalStake)} icon={farm.icon} />
                </React.Fragment>
              ))}

              <StyledPool>
                <StyledFlex>
                  <BentoIcon size={75} meme={'🍤'} />
                  <StyledSubtitle>COMP</StyledSubtitle>
                </StyledFlex>
                <StyledSubtitle>
                  88888
                </StyledSubtitle>
              </StyledPool>

              <StyledPool>
                <StyledFlex>
                  <BentoIcon size={61} meme={'🥩'} />
                  <StyledSubtitle>UNI</StyledSubtitle>
                </StyledFlex>
                <StyledSubtitle>
                  99999
                </StyledSubtitle>
              </StyledPool>

              <StyledPool>
                <StyledFlex>
                  <BentoIcon size={52} meme={'🍙'} />
                  <StyledSubtitle>AAVE</StyledSubtitle>
                </StyledFlex>
                <StyledSubtitle>
                  7777
                </StyledSubtitle>
              </StyledPool>

              <StyledPool>
                <StyledFlex>
                  <BentoIcon meme={'🍔'} />
                  <StyledSubtitle>MKR</StyledSubtitle>
                </StyledFlex>
                <StyledSubtitle>
                  6666
                </StyledSubtitle>
              </StyledPool>


            </StyledPools>
          </CardContent>
          <Footnote>
            <Button text={`${t.stake}`} href="https://app.uniswap.org/#/swap" variant="default" size="md" />

          </Footnote>
        </Card>
        <Spacer />

        <Card>
          <CardContent>
            <StyledBalances>
              <div style={{ flex: 1 }}>
                <StyledTitle>
                  <Label text={`🔥${t.burnedToken} $BENTO`} />
                  <Value value={t.locked} />
                </StyledTitle>

              </div>
            </StyledBalances>
            <StyledAuctionEntrys>
              <Spacer size="sm" />
              <StyledSubtitle>
                <Label text={`${t.auctioning}`} />
              </StyledSubtitle>
              <Spacer size="sm"></Spacer>

              {votes.map((vote, j) => (
                <React.Fragment key={j}>
                  <Vote vote={vote} />
                </React.Fragment>
              ))}

              <StyledAuctionEntry>
                <StyledAuctionEntryName>
                  <Label text="vote id" />
                </StyledAuctionEntryName>
                <Spacer></Spacer>
                <StyledAuctionEntryContent>
                  <input onChange={handleChange} />
                </StyledAuctionEntryContent>
                <Spacer size="sm"></Spacer>
                <StyledAuctionEntryContent>
                  <Button onClick={() => {
                    govLaunchVote(bento, val, account)
                  }} text="launch vote"/>
                </StyledAuctionEntryContent>
              </StyledAuctionEntry>
            </StyledAuctionEntrys>
          </CardContent>
          <Footnote>
            <Button text={`${t.buy}`} href="https://app.uniswap.org/#/swap" variant="default" size="md" />
          </Footnote>
        </Card>
      </StyledWrapper>
    </>
  )
}


interface IFarm {
  name: string
  icon: string,
  size: number,
  govTotalStake: number,
}

export interface Vote {
  vote: IVote
}

const Vote: React.FC<Vote> = ({ vote }) => {
  return (
    <>
      <StyledAuctionEntry>
        <StyledAuctionEntryName>
          <Label text={`${vote.name} ${vote.proposal_id}`} />
        </StyledAuctionEntryName>
        <Spacer></Spacer>
        <StyledAuctionEntryContent>
          <Label text="$BENTO"></Label>
        </StyledAuctionEntryContent>
        <Spacer size="sm"></Spacer>
        <StyledAuctionEntryContent>
          <Label text={getBalanceNumber(vote.nowBentosInVote).toString()} />
        </StyledAuctionEntryContent>
      </StyledAuctionEntry>
      <Spacer size="sm"></Spacer>
    </>
  )
}
const Pool: React.FC<IFarm> = ({ name, icon, size, govTotalStake }) => {
  return (
    <StyledPool>
      <StyledFlex>
        <BentoIcon meme={icon} size={size} />
        <StyledSubtitle>{name}</StyledSubtitle>
      </StyledFlex>
      <StyledSubtitle>
        {govTotalStake}
      </StyledSubtitle>
    </StyledPool>
  )

}

const ButtonStyle = styled.div`
  width: 30%
`

const StyledAuctionEntrys = styled.div`
margin-top: 10px;
  border-top: 2px solid #e6dcd5;
`


const StyledAuctionEntry = styled.div`
display: flow;
  border: 1px solid #e6dcd5;
  border-radius: 8px;
  background: #ffffff;
  padding: 0px 1px 0px 8px;
`

const StyledPools = styled.div`
  margin-top: 19px;
`

const StyledPool = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fffdfa;
  color: #aa9584;
  width: 100%;
  margin-top: 13px;
  line-height: 32px;
  font-size: 13px;
  border: 1px solid #e6dcd5;
  text-align: center;
  padding: 0 12px;
`


const StyledFlex = styled.div`
  display: flow;
`

const StyledLogoWrapper = styled.div`
  width: 260px;
  @media (max-width: 400px) {
    width: auto;
  }
`
const StyledIcon = styled.div`
  font-size: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  width: 120px;
`

const StyledAuctionEntryContent = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 18px;
  font-weight: 400;
  text-align: right;
  margin-let: 10px;
  width: 20%;
`
const StyledAuctionEntryName = styled.h3`
  color: ${(props) => props.theme.color.black[400]};
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  width: 40%;
`

const StyledSubtitle = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
`

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fffdfa;
  color: #aa9584;
  width: 100%;
  margin-top: 12px;
  line-height: 32px;
  font-size: 13px;
  border: 1px solid #e6dcd5;
  text-align: center;
  padding: 0 12px;
`

const StyledTitle = styled.h1`
  font-family: Verdana, Geneva, sans-serif;
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 25px;
  font-weight: 540;
  margin: 0;
  padding: 0;
`

const Footnote = styled.div`
  font-size: 14px;
  padding: 8px 20px;
  color: ${(props) => props.theme.color.grey[400]};
  border-top: solid 1px ${(props) => props.theme.color.grey[300]};
`
const FootnoteValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  float: right;
`

const StyledWrapper = styled.div`
  align-items: top;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

export default Balances
