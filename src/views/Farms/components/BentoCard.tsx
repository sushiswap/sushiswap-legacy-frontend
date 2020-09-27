import BigNumber from 'bignumber.js'
import { tmpdir } from 'os'
import React, { useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'
import { useWallet } from 'use-wallet'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import SidedCardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import { Farm } from '../../../contexts/Farms'
import useAllStakedValue, {
  StakedValue,
} from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useSushi from '../../../hooks/useSushi'
import { getEarned, getMasterChefContract } from '../../../sushi/utils'
import { bnToDec } from '../../../utils'
import { useI18n  } from 'use-i18n';
import useModal from '../../../hooks/useModal'
import useStake from '../../../hooks/useStake'
import DepositModal from './DepositModal'
import StyledBadge from './StyledBadge'

interface FarmWithStakedValue extends Farm, StakedValue {
  apy: BigNumber
}

interface FarmCardProps {
  farm: FarmWithStakedValue
}

const BentoCard: React.FC<FarmCardProps> = ({ farm }) => {
  const t = useI18n();

  const [startTime, setStartTime] = useState(0)
  const [harvestable, setHarvestable] = useState(0)

  const { account } = useWallet()
  const { lpTokenAddress } = farm
  const sushi = useSushi()

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>
        {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  useEffect(() => {
    async function fetchEarned() {
      if (sushi) return
      const earned = await getEarned(
        getMasterChefContract(sushi),
        lpTokenAddress,
        account,
      )
      setHarvestable(bnToDec(earned))
    }
    if (sushi && account) {
      fetchEarned()
    }
  }, [sushi, lpTokenAddress, account, setHarvestable])

  const tokenBalance = new BigNumber(0);
  const { onStake } = useStake(1)
  const tokenName = 'NAP'
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onStake}
      tokenName={tokenName}
    />,
  )

  const poolActive = true // startTime * 1000 - Date.now() <= 0

  return (
    <StyledCardWrapper>
        <Card>
          <StyledBadge badgeContent='X4' color="secondary">
          <CardContent>
          <StyledContent>
              <StyledText>
                <span style={{ textAlign: 'left' }}><SidedCardIcon>{farm.icon}</SidedCardIcon></span>
                <span style={{ textAlign: 'center' }}><StyledTitle>BENTO{t.shop}</StyledTitle></span>
              </StyledText>
              <StyledDetails>
                <StyledDetail>{t.farm_earn_bento}</StyledDetail>
              </StyledDetails>
            </StyledContent>
            <StyledContainer>
              <StyledText>
                <span>{t.current}POWER</span>
                <span style={{ textAlign: 'right' }}>
                  1234
                </span>
              </StyledText>
              <StyledContent>
                <Button
                  size='sm'
                  disabled={!poolActive}
                  text={t.farm_uniswap}
                  onClick={onPresentDeposit}
                >
                  {!poolActive && (
                    <Countdown
                      date={new Date(startTime * 1000)}
                      renderer={renderer}
                    />
                  )}
                </Button>
                <Button
                  size='sm'
                  disabled={!poolActive}
                  text={t.farm_balancer}
                  to={`/farms/${farm.id}`}
                >
                  {!poolActive && (
                    <Countdown
                      date={new Date(startTime * 1000)}
                      renderer={renderer}
                    />
                  )}
                </Button>
              </StyledContent>
            </StyledContainer>
            <StyledContainer>
              <StyledText>
                <span>
                    <Button
                        size='sm'
                        disabled={!poolActive}
                        text={t.unclaimed + 'BENTO'}
                        to={`/farms/${farm.id}`}
                      >
                        {!poolActive && (
                          <Countdown
                            date={new Date(startTime * 1000)}
                            renderer={renderer}
                          />
                        )}
                      </Button>
                </span>
                <span style={{ textAlign: 'right' }}>456</span>
              </StyledText>
              <StyledText>
                <span>
                    <Button
                        size='sm'
                        disabled={!poolActive}
                        text={t.inBank + 'BENTO'}
                        to={`/farms/${farm.id}`}
                      >
                        {!poolActive && (
                          <Countdown
                            date={new Date(startTime * 1000)}
                            renderer={renderer}
                          />
                        )}
                      </Button>
                </span>
                <span style={{ textAlign: 'right' }}>456</span>
              </StyledText>
            </StyledContainer>
              <StyledInsight>
                <span>APY</span>
                <span>
                  {farm.apy
                    ? `${farm.apy
                        .times(new BigNumber(100))
                        .toNumber()
                        .toLocaleString('en-US')
                        .slice(0, -1)}%`
                    : 'Loading ...'}
                </span>
              </StyledInsight>
          </CardContent>
          </StyledBadge>
        </Card>
    </StyledCardWrapper>
  )
}

const RainbowLight = keyframes`
  
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.grey[500]};
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

const StyledContainer = styled.div`
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  color: #aa9584;
  width: 100%;
  margin-top: 12px;
  line-height: 32px;
  font-size: 13px;
  border: 1px solid #e6dcd5;
  text-align: center;
  padding: 0 12px;
  `

const StyledText = styled.div`
  display: flex;
  justify-content: space-between;
  color: #aa9584;
  width: 100%;
  margin-top: 12px;
  line-height: 32px;
  font-size: 13px;
  text-align: center;
`

export default BentoCard
