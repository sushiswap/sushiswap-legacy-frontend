import React from 'react'
import styled from 'styled-components'

interface CardIconProps {
  children?: React.ReactNode,
}

const CardIcon: React.FC<CardIconProps> = ({ children }) => (
  <StyledCardIcon>
    {children}
  </StyledCardIcon>
)

const StyledCardIcon = styled.div`
  background-color: ${props => props.theme.color.grey[200]};
  font-size: 36px;
  height: 40px;
  width: 40px;
  border-radius: 40px;
  align-items: center;
  display: flex;
  justify-content: center;
  box-shadow: inset 4px 4px 8px ${props => props.theme.color.grey[300]},
    inset -6px -6px 12px ${props => props.theme.color.grey[100]};
  margin: 0 auto ${props => props.theme.spacing[3]}px;
`

const SidedCardIcon: React.FC<CardIconProps> = ({ children }) => (
  <StyledSidedCardIcon>
    {children}
  </StyledSidedCardIcon>
)

const StyledSidedCardIcon = styled.div`
  background-color: ${props => props.theme.color.grey[200]};
  font-size: 36px;
  height: 40px;
  width: 40px;
  border-radius: 40px;
  align-items: center;
  display: flex;
  justify-content: center;
  box-shadow: inset 4px 4px 8px ${props => props.theme.color.grey[300]},
    inset -6px -6px 12px ${props => props.theme.color.grey[100]};
  // margin: 0 auto ${props => props.theme.spacing[3]}px;
`

export const MiniCardIcon: React.FC<CardIconProps> = ({ children }) => (
  <StyledMiniCardIcon>
    {children}
  </StyledMiniCardIcon>
)

const StyledMiniCardIcon = styled.div`
  background-color: ${props => props.theme.color.grey[200]};
  font-size: 5px;
  height: 5px;
  width: 5px;
  border-radius: 20px;
  align-items: center;
  display: flex;
  justify-content: center;
  // box-shadow: inset 4px 4px 8px ${props => props.theme.color.grey[300]},
  //   inset -6px -6px 12px ${props => props.theme.color.grey[100]};
  // margin: 0 auto ${props => props.theme.spacing[3]}px;
`

export default CardIcon