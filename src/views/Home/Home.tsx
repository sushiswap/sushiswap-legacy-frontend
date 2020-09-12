import React from 'react'
import styled from 'styled-components'
import metaswap from '../../assets/img/metaswap.svg'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'

const Home: React.FC = () => {
  return (
    <Page>
      <PageHeader
        icon={<img src={metaswap} height={120} />}
        title="Are You Ready To Swap?"
        subtitle="Stake Uniswap LP tokens to claim your very own METM"
      />
      <div
        style={{
          margin: '0 auto',
          paddingBottom: '4em'
        }}
      >
        <Button text="Claim Rewards" href="https://uniswap.info/pair/0x77d50919243dc6a7d7a19360006aeea1caf461e2" variant="secondary" />
      </div>
      <Container>
        
        <Balances />
      </Container>
      <Spacer size="lg" />
      <StyledInfo>
        🏆<b>Pro Tip</b>: METM-ETH UNI-V2 LP token pool yields TWICE more token
        rewards per block.
      </StyledInfo>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button text="Pool Access" to="/farms" variant="secondary" />
      </div>
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 16px;
  font-weight: 400;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`

export default Home
