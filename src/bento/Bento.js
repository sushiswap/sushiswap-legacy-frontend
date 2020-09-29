import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { Contracts } from './lib/bento_contracts.js'
import { Account } from './lib/accounts.js'
import { EVM } from './lib/evm.js'

import { contractAddresses } from './lib/constants'

export class Bento {
  constructor(provider, networkId, testing, options) {
    var realProvider
    console.log('===========Bento constructor start==========')
    if (typeof provider === 'string') {
      if (provider.includes('wss')) {
        realProvider = new Web3.providers.WebsocketProvider(
          provider,
          options.ethereumNodeTimeout || 10000,
        )
      } else {
        realProvider = new Web3.providers.HttpProvider(
          provider,
          options.ethereumNodeTimeout || 10000,
        )
      }
    } else {
      realProvider = provider
    }

    this.web3 = new Web3(realProvider)

    if (testing) {
      this.testing = new EVM(realProvider)
      this.snapshot = this.testing.snapshot()
    }

    if (options.defaultAccount) {
      this.web3.eth.defaultAccount = options.defaultAccount
    }
    const util = require('util')
    console.log(`load contract ${util.inspect(realProvider)}, ${networkId}, ${util.inspect(options)}`)
    this.contracts = new Contracts(realProvider, networkId, this.web3, options)
    this.bentoAddress = contractAddresses.bento[networkId]
    this.bentoMinerAddress = contractAddresses.bentoMiner[networkId]
    this.wethAddress = contractAddresses.weth[networkId]
    console.log('===========Bento constructor start==========')
  }

  async resetEVM() {
    this.testing.resetEVM(this.snapshot)
  }

  addAccount(address, number) {
    this.accounts.push(new Account(this.contracts, address, number))
  }

  setProvider(provider, networkId) {
    this.web3.setProvider(provider)
    this.contracts.setProvider(provider, networkId)
    this.operation.setNetworkId(networkId)
  }

  setDefaultAccount(account) {
    this.web3.eth.defaultAccount = account
    this.contracts.setDefaultAccount(account)
  }

  getDefaultAccount() {
    return this.web3.eth.defaultAccount
  }

  loadAccount(account) {
    const newAccount = this.web3.eth.accounts.wallet.add(account.privateKey)

    if (
      !newAccount ||
      (account.address &&
        account.address.toLowerCase() !== newAccount.address.toLowerCase())
    ) {
      throw new Error(`Loaded account address mismatch.
        Expected ${account.address}, got ${
        newAccount ? newAccount.address : null
      }`)
    }
  }

  toBigN(a) {
    return BigNumber(a)
  }
}
