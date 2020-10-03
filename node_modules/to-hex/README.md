# to-hex

> Convert values to hex string

[![License](http://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/miguelmota/to-hex/master/LICENSE)
[![NPM version](https://badge.fury.io/js/to-hex.svg)](http://badge.fury.io/js/to-hex)

## Install

```bash
npm install to-hex
```

## Getting started

```javascript
const toHex = require('to-hex')
const BN = require('bn.js')

console.log(toHex('abc')) // '616263'
console.log(toHex(Buffer.from('abc'))) // '616263'
console.log(toHex('abc', { addPrefix: true })) // '0x616263'
console.log(toHex(256)) // '100'
console.log(toHex(256, { evenLength: true })) // '0100'
console.log(toHex(new BN(256))) // '100'
console.log(toHex('0x1', { size: 8 })) // '00000001'
console.log(toHex(null, { addPrefix: true, evenLength: true, default: '0' }) // '0x00'
```

## Test

```bash
npm test
```

## License

[MIT](LICENSE)
