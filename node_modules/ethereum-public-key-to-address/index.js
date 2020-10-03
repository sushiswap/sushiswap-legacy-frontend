const { publicKeyConvert } = require('secp256k1')
const keccak256 = require('keccak256')
const { toChecksumAddress } = require('ethereum-checksum-address')

function publicKeyToAddress (publicKey) {
  if (!Buffer.isBuffer(publicKey)) {
    if (typeof publicKey !== 'string') {
      throw new Error('Expected Buffer or string as argument')
    }

    publicKey = publicKey.slice(0, 2) === '0x' ? publicKey.slice(2) : publicKey
    publicKey = Buffer.from(publicKey, 'hex')
  }

  publicKey = publicKeyConvert(publicKey, false).slice(1)
  return toChecksumAddress(keccak256(publicKey).slice(-20).toString('hex'))
}

module.exports = publicKeyToAddress
