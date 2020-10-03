import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
  background: linear-gradient(90deg, rgba(26,29,42,1) 0%, rgba(17,20,29,1) 100%);
  box-shadow: 0px 2px 12px rgba(0,0,0, .5);
  border-radius: 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default Card
