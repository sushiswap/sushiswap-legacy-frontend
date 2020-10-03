const normalizeHex = require('normalize-hex')

console.log(normalizeHex('abc')), // 'abc'
console.log(normalizeHex('abc', { evenLength: true })) // '0abc'
console.log(normalizeHex('abc', { addPrefix: true })) // '0xabc'
console.log(normalizeHex('abc', { evenLength: true, addPrefix: true })) // '0x0abc'
console.log(normalizeHex('0xabc')) // 'abc'
