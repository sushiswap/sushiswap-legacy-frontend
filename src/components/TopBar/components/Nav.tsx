import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useI18n  } from 'use-i18n';

const Nav: React.FC = () => {
  const t = useI18n()
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">
        {t.home}
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/farms">
        {t.canteen}
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/staking">
        {t.auction}
      </StyledLink>
      <StyledAbsoluteLink
        href="https://resetDAO.com"
        target="_blank"
      >
        {t.about}
      </StyledAbsoluteLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color.grey[400]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

const StyledAbsoluteLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

export default Nav
