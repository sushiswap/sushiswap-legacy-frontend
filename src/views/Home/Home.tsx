import React from 'react'
import styled from 'styled-components'
import chef from '../../assets/img/chef.png'
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
        icon={<img src={chef} height={120} />}
        title="MasterChef is Ready"
        subtitle="Stake Uniswap LP tokens to claim your very own yummy SUSHI!"
      />

      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      <StyledInfo>
        <b>🪂 Welcome!</b>
      </StyledInfo>
      <StyledInfo>
        You're currently using our classic interface (<b>sushiswapclassic.org</b>).
      </StyledInfo>
      <StyledInfo>
        Soon, we'll be launching a new UI on <b>sushiswap.org</b>.
      </StyledInfo>
      <StyledInfo>
        Until that time, please enjoy using our classic interface!
      </StyledInfo>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button
          text="🔪 Learn more about SushiSwap"
          href="https://help.sushidocs.com/"
          variant="secondary"
        />
      </div>
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`

export default Home
