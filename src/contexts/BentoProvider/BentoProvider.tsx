import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Bento } from '../../bento'

export interface BentoContext {
  bento?: typeof Bento
}

export const Context = createContext<BentoContext>({
  bento: undefined,
})

declare global {
  interface Window {
    sushisauce: any
  }
}

const BentoProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [bento, setBento] = useState<any>()

  // @ts-ignore
  window.bento = bento
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const bentoLib = new Bento(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      console.log('bentoLib: ', bentoLib)
      setBento(bentoLib)
      window.sushisauce = bentoLib
    }
  }, [ethereum])

  return <Context.Provider value={{ bento }}>{children}</Context.Provider>
}

export default BentoProvider
