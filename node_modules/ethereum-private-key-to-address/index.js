const privateKeyToPublicKey = require('ethereum-private-key-to-public-key')
const publicKeyToAddress  = require('ethereum-public-key-to-address')

function privateKeyToAddress (privateKey) {
  if (!Buffer.isBuffer(privateKey)) {
    if (typeof privateKey !== 'string') {
      throw new Error('Expected Buffer or string as argument')
    }

    privateKey = privateKey.slice(0, 2) === '0x' ? privateKey.slice(2) : privateKey
    privateKey = Buffer.from(privateKey, 'hex')
  }

  return publicKeyToAddress(privateKeyToPublicKey(privateKey))
}

module.exports = privateKeyToAddress
