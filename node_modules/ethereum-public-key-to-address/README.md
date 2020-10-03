# ethereum-public-key-to-address

> Convert an Ethereum public key to an address

[![License](http://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/miguelmota/ethereum-public-key-to-address/master/LICENSE)
[![NPM version](https://badge.fury.io/js/ethereum-public-key-to-address.svg)](http://badge.fury.io/js/ethereum-public-key-to-address)

## Install

```bash
npm install ethereum-public-key-to-address
```

## Getting started

```javascript
const publicKeyToAddress = require('ethereum-public-key-to-address')

console.log(publicKeyToAddress(Buffer.from('04e68acfc0253a10620dff706b0a1b1f1f5833ea3beb3bde2250d5f271f3563606672ebc45e0b7ea2e816ecb70ca03137b1c9476eec63d4632e990020b7b6fba39', 'hex'))) // '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
console.log(publicKeyToAddress('04e68acfc0253a10620dff706b0a1b1f1f5833ea3beb3bde2250d5f271f3563606672ebc45e0b7ea2e816ecb70ca03137b1c9476eec63d4632e990020b7b6fba39')) // '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
console.log(publicKeyToAddress('0x04e68acfc0253a10620dff706b0a1b1f1f5833ea3beb3bde2250d5f271f3563606672ebc45e0b7ea2e816ecb70ca03137b1c9476eec63d4632e990020b7b6fba39')) // '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
```

## CLI

Install:

```bash
npm install -g ethereum-public-key-to-address
```

Convert public key to address:

```bash
$ ethereum_public_key_to_address 04e68acfc0253a10620dff706b0a1b1f1f5833ea3beb3bde2250d5f271f3563606672ebc45e0b7ea2e816ecb70ca03137b1c9476eec63d4632e990020b7b6fba39

0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1
```

## Test

```bash
npm test
```

## License

[MIT](LICENSE)
