import React from 'react'
import styled from 'styled-components'


const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
  background: linear-gradient(151deg, rgba(177,87,255,1) 0%, rgba(130,82,255,1) 100%);
  
  border-radius: 12px;
  box-shadow: 2px 2px 25px -5px rgba(0,0,0,0.6587009803921569);
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default Card
