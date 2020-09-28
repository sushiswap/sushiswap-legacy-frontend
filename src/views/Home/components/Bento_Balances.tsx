import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import BentoIcon from '../../../components/BentoIcon'
import useAllEarnings from '../../../bento_hooks/useAllEarnings'
import useAllStakedValue from '../../../bento_hooks/useAllStakedValue'
import useFarms from '../../../bento_hooks/useFarms'
import useTokenBalance from '../../../bento_hooks/useTokenBalance'
import useBento from '../../../bento_hooks/useBento'
import { getBentoAddress, getBentoSupply } from '../../../bento/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { useI18n } from 'use-i18n';
import Button from '../../../components/Button'
import Logo from '../../../components/Logo'
const PendingRewards: React.FC = () => {
  const t = useI18n()
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarnings()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  const [farms] = useFarms()
  const allStakedValue = useAllStakedValue()

  if (allStakedValue && allStakedValue.length) {
    const sumWeth = farms.reduce(
      (c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0),
      0,
    )
  }

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [sumEarning])

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

  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const bento = useBento()
  console.log('bento_balances: bento: ', bento)
  const bentoBalance = useTokenBalance(getBentoAddress(bento))
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()
  const start = 0
  const end = 9837284.478278

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getBentoSupply(bento)
      setTotalSupply(supply)
    }
    if (bento) {
      fetchTotalSupply()
    }
  }, [bento, setTotalSupply])

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
              <div style={{ width: 150. }}>
                <Button text={`🍱${t.mining}`} to="/farms" variant="default" size="md" />
              </div>
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
                  value={totalSupply ? getBalanceNumber(totalSupply) : t.locked}
                />
              </div>
              <div style={{ width: 150. }}>
                <Button text={`${t.buy}🍱`} href="https://app.uniswap.org/#/swap" variant="default" size="md" />
              </div>
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
                </StyledTitle>
                <StyledTitle>
                  <CountUp
                    start={start}
                    end={end}
                    decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
                    duration={3}
                    separator=","
                  />
                </StyledTitle>
              </div>
            </StyledBalances>
            <StyledAuctionEntrys>
              <Spacer size="sm"/>
              <StyledSubtitle>
                <Label text={`${t.auctioning}`} />
              </StyledSubtitle>
              <StyledAuctionEntry>
                <StyledAuctionEntryName>
                  <Label text="COMP-IP221" />
                </StyledAuctionEntryName>
                <Spacer></Spacer>
                <StyledAuctionEntryContent>
                  <Label text="$BENTO"></Label>
                </StyledAuctionEntryContent>
                <Spacer size="sm"></Spacer>
                <StyledAuctionEntryContent>
                  <Label text="88888" />
                </StyledAuctionEntryContent>
              </StyledAuctionEntry>
              <Spacer size="sm"></Spacer>
              <StyledAuctionEntry>
                <StyledAuctionEntryName>
                  <Label text="UNI-IP333" />
                </StyledAuctionEntryName>
                <Spacer></Spacer>
                <StyledAuctionEntryContent>
                  <Label text="$BENTO"></Label>
                </StyledAuctionEntryContent>
                <Spacer size="sm"></Spacer>
                <StyledAuctionEntryContent>
                  <Label text="77777" />
                </StyledAuctionEntryContent>
              </StyledAuctionEntry>
              <Spacer size="sm"></Spacer>
              <StyledAuctionEntry>
                <StyledAuctionEntryName>
                  <Label text="AIP 123" />
                </StyledAuctionEntryName>
                <Spacer></Spacer>
                <StyledAuctionEntryContent>
                  <Label text="$BENTO"></Label>
                </StyledAuctionEntryContent>
                <Spacer size="sm"></Spacer>
                <StyledAuctionEntryContent>
                  <Label text="58589" />
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
