# ethereum-checksum-address

> Convert Ethereum address to a checksummed address

[![License](http://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/miguelmota/ethereum-checksum-address/master/LICENSE)
[![NPM version](https://badge.fury.io/js/ethereum-checksum-address.svg)](http://badge.fury.io/js/ethereum-checksum-address)

## Install

```bash
npm install ethereum-checksum-address
```

## Getting started

Convert to a checksummed address:

```javascript
const { toChecksumAddress } = require('ethereum-checksum-address')

console.log(toChecksumAddress('0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1')) // '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
console.log(toChecksumAddress('0x90F8BF6A479F320EAD074411A4B0E7944EA8C9C1')) // '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
```

Check if address is a checksummed address:

```javascript
const { checkAddressChecksum } = require('ethereum-checksum-address')

console.log(checkAddressChecksum('0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1')) // true
console.log(checkAddressChecksum('0x90F8BF6A479F320EAD074411A4B0E7944EA8C9C1')) // false
```

## CLI

Install:

```bash
npm install -g ethereum-checksum-address
```

Convert address to checksummed address:

```bash
$ ethereum_checksum_address 0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1

0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1
```

Check if address is a checksummed address

```bash
$ ethereum_checksum_address 0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1 --check

true
```

## Test

```bash
npm test
```

## License

[MIT](LICENSE)
