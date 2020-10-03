# ethereum-private-key-to-public-key

> Convert an Ethereum private key to a public key

[![License](http://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/miguelmota/ethereum-private-key-to-public-key/master/LICENSE)
[![NPM version](https://badge.fury.io/js/ethereum-private-key-to-public-key.svg)](http://badge.fury.io/js/ethereum-private-key-to-public-key)

## Install

```bash
npm install ethereum-private-key-to-public-key
```

## Getting started

```javascript
const privateKeyToPublicKey = require('ethereum-private-key-to-public-key')

console.log(privateKeyToPublicKey(Buffer.from('4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d', 'hex')).toString('hex')) // '04e68acfc0253a10620dff706b0a1b1f1f5833ea3beb3bde2250d5f271f3563606672ebc45e0b7ea2e816ecb70ca03137b1c9476eec63d4632e990020b7b6fba39'
console.log(privateKeyToPublicKey('4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d').toString('hex')) // '04e68acfc0253a10620dff706b0a1b1f1f5833ea3beb3bde2250d5f271f3563606672ebc45e0b7ea2e816ecb70ca03137b1c9476eec63d4632e990020b7b6fba39'
console.log(privateKeyToPublicKey('0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d').toString('hex')) // '04e68acfc0253a10620dff706b0a1b1f1f5833ea3beb3bde2250d5f271f3563606672ebc45e0b7ea2e816ecb70ca03137b1c9476eec63d4632e990020b7b6fba39'
```

## CLI

Install:

```bash
npm install -g ethereum-private-key-to-public-key
```

Convert private key to public key:

```bash
$ ethereum_private_key_to_public_key 4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d

04e68acfc0253a10620dff706b0a1b1f1f5833ea3beb3bde2250d5f271f3563606672ebc45e0b7ea2e816ecb70ca03137b1c9476eec63d4632e990020b7b6fba39
```

## Test

```bash
npm test
```

## License

[MIT](LICENSE)
