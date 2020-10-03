const toHex = require('to-hex')
const BN = require('bn.js')

console.log(toHex('abc')) // '616263'
console.log(toHex(Buffer.from('abc'))) // '616263'
console.log(toHex('abc', { addPrefix: true })) // '0x616263'
console.log(toHex(256)) // '100'
console.log(toHex(256, { evenLength: true })) // '0100'
console.log(toHex(new BN(256))) // '100'
console.log(toHex('0x1', { size: 8 })) // '00000001'
