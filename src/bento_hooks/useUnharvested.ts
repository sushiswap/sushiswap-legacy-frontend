import { useContext } from 'react'
import { Context as FarmsContext } from '../contexts/bento_Farms'

const useUnharvested = () => {
  const { unharvested } = useContext(FarmsContext)
  return unharvested
}

export default useUnharvested
