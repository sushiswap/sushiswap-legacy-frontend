import { useContext } from 'react'
import { Context } from '../contexts/BentoProvider'

const useBento = () => {
  const { bento } = useContext(Context)
  return bento
}

export default useBento
