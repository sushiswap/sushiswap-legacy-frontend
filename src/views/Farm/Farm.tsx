import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import useFarm from '../../hooks/useFarm'
import { getContract } from '../../utils/erc20'
import Harvest from './components/Harvest'
import Stake from './components/Stake'

const Farm: React.FC = () => {
  const { farmId } = useParams()
  const {
    lpToken,
    tokenAddress,
    earnToken,
    name,
    icon,
    lpContract,
    poolContract
  } = useFarm(farmId) || {
    lpToken: '',
    tokenAddress: '',
    earnToken: '',
    name: '',
    icon: '',
    poolContract: null,
    lpContract: null,
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { ethereum } = useWallet()

  const lpTokenName = useMemo(() => {
    return lpToken.toUpperCase()
  }, [lpToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  // We're still loading
  if (!lpContract || !poolContract) {
    return <></>
  }

  return (
    <>
      <PageHeader
        icon={icon}
        subtitle={`Deposit ${lpTokenName}  Tokens and earn ${earnTokenName}`}
        title={name}
      />
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest poolContract={poolContract} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake
              lpContract={lpContract}
              poolContract={poolContract}
              tokenName={lpToken.toUpperCase()}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <StyledInfo>
          ⭐️ Every time you stake and unstake LP tokens, the contract will
          automagically harvest SUSHI rewards for you!
        </StyledInfo>
        <Spacer size="lg" />
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default Farm
