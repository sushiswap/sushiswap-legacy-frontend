import React from 'react'

interface SushiIconProps {
  size?: number
  v1?: boolean
  v2?: boolean
  v3?: boolean
  meme?: string
}

const SushiIcon: React.FC<SushiIconProps> = ({ size = 36, v1, v2, v3, meme }) => (
  <span
    role="img"
    style={{
      fontSize: size,
      filter: v1 ? 'saturate(0.5)' : undefined,
    }}
  >
    {!!meme? meme: '🍣'}
  </span>
)

export default SushiIcon
