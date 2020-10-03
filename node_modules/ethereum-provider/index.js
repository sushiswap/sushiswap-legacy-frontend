const EventEmitter = require('events')

class EthereumProvider extends EventEmitter {
  constructor (connection) {
    super()
    this.connected = false
    this.nextId = 0
    this.promises = {}
    this.subscriptions = []
    this.connection = connection
    this.connection.on('connect', () => this.checkConnection())
    this.connection.on('close', () => this.emit('close'))
    this.connection.on('payload', payload => {
      const { id, method, error, result } = payload
      if (typeof id !== 'undefined') {
        if (this.promises[id]) { // Fulfill promise
          payload.error ? this.promises[id].reject(error) : this.promises[id].resolve(result)
          delete this.promises[id]
        }
      } else if (method && method.indexOf('_subscription') > -1) { // Emit subscription result
        this.emit(payload.params.subscription, payload.params.result)
        this.emit(method, payload.params) // Latest EIP-1193
        this.emit('data', payload) // Backwards Compatibility
      }
    })
    this.on('newListener', (event, listener) => {
      if (event === 'networkChanged') {
        if (!this.attemptedNetworkSubscription && this.connected) this.startNetworkSubscription()
      } else if (event === 'accountsChanged') {
        if (!this.attemptedAccountsSubscription && this.connected) this.startAccountsSubscription()
      }
    })
  }
  async checkConnection () {
    try {
      this.emit('connect', await this._send('net_version'))
      this.connected = true
      if (this.listenerCount('networkChanged') && !this.attemptedNetworkSubscription) this.startNetworkSubscription()
      if (this.listenerCount('accountsChanged') && !this.attemptedAccountsSubscription) this.startAccountsSubscription()
    } catch (e) {
      this.connected = false
    }
  }
  async startNetworkSubscription () {
    this.attemptedNetworkSubscription = true
    try {
      let networkChanged = await this.subscribe('eth_subscribe', 'networkChanged')
      this.on(networkChanged, netId => this.emit('networkChanged', netId))
    } catch (e) {
      console.warn('Unable to subscribe to networkChanged', e)
    }
  }
  async startAccountsSubscription () {
    this.attemptedAccountsSubscription = true
    try {
      let accountsChanged = await this.subscribe('eth_subscribe', 'accountsChanged')
      this.on(accountsChanged, accounts => this.emit('accountsChanged', accounts))
    } catch (e) {
      console.warn('Unable to subscribe to accountsChanged', e)
    }
  }
  enable () {
    return new Promise((resolve, reject) => {
      this._send('eth_accounts').then(accounts => {
        if (accounts.length > 0) {
          this.accounts = accounts
          this.coinbase = accounts[0]
          this.emit('enable')
          resolve(accounts)
        } else {
          const err = new Error('User Denied Full Provider')
          err.code = 4001
          reject(err)
        }
      }).catch(reject)
    })
  }
  _send (method, params = []) {
    if (!method || typeof method !== 'string') return new Error('Method is not a valid string.')
    if (!(params instanceof Array)) return new Error('Params is not a valid array.')
    const payload = { jsonrpc: '2.0', id: this.nextId++, method, params }
    const promise = new Promise((resolve, reject) => { this.promises[payload.id] = { resolve, reject } })
    this.connection.send(payload)
    return promise
  }
  send (...args) { // Send can be clobbered, proxy sendPromise for backwards compatibility
    return this._send(...args)
  }
  _sendBatch (requests) {
    return Promise.all(requests.map(payload => this._send(payload.method, payload.params)))
  }
  subscribe (type, method, params = []) {
    return this._send(type, [method, ...params]).then(id => {
      this.subscriptions.push(id)
      return id
    })
  }
  unsubscribe (type, id) {
    return this._send(type, [id]).then(success => {
      if (success) {
        this.subscriptions = this.subscriptions.filter(_id => _id !== id) // Remove subscription
        this.removeAllListeners(id) // Remove listeners
        return success
      }
    })
  }
  sendAsync (payload, cb) { // Backwards Compatibility
    if (!cb || typeof cb !== 'function') return cb(new Error('Invalid or undefined callback provided to sendAsync'))
    if (!payload) return cb(new Error('Invalid Payload'))
    // sendAsync can be called with an array for batch requests used by web3.js 0.x
    // this is not part of EIP-1193's backwards compatibility but we still want to support it
    if (payload instanceof Array) {
      return this.sendAsyncBatch(payload, cb)
    } else {
      return this._send(payload.method, payload.params).then(result => {
        cb(null, { id: payload.id, jsonrpc: payload.jsonrpc, result })
      }).catch(err => {
        cb(err)
      })
    }
  }
  sendAsyncBatch (payload, cb) {
    return this._sendBatch(payload).then((results) => {
      let result = results.map((entry, index) => {
        return { id: payload[index].id, jsonrpc: payload[index].jsonrpc, result: entry }
      })
      cb(null, result)
    }).catch(err => {
      cb(err)
    })
  }
  isConnected () { // Backwards Compatibility
    return this.connected
  }
  close () {
    this.connection.close()
    this.connected = false
    let error = new Error(`Provider closed, subscription lost, please subscribe again.`)
    this.subscriptions.forEach(id => this.emit(id, error)) // Send Error objects to any open subscriptions
    this.subscriptions = [] // Clear subscriptions
  }
}

module.exports = EthereumProvider
