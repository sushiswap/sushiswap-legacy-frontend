import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink
        target="_blank"
        href="https://etherscan.io/address/0xc2edad668740f1aa35e4d8f227fb8e17dca888cd#code"
      >
        Contract
      </StyledLink>
      <StyledLink
        target="_blank"
        href="https://uniswap.info/pair/0xce84867c3c02b05dc570d0135103d3fb9cc19433"
      >
        Uniswap
      </StyledLink>
      <StyledLink target="_blank" href="https://discord.gg/hJ2p555">
        Discord
      </StyledLink>
      <StyledLink target="_blank" href="https://github.com/sushiswap">
        Github
      </StyledLink>
      <StyledLink target="_blank" href="https://twitter.com/sushiswap">
        Twitter
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  // color: ${(props) => props.theme.color.grey[400]};
  color: #fff;
  font-size: 12px;
  margin-right: 5px;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: 4px;
  text-decoration: none;
  transition: all .25s;
  &:hover {
    // color: ${(props) => props.theme.color.grey[500]};
    border-bottom: 1px solid #fff;
  }

`

export default Nav
