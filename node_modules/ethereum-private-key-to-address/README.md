# ethereum-private-key-to-address

> Convert an Ethereum private key to a public address

[![License](http://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/miguelmota/ethereum-private-key-to-address/master/LICENSE)
[![NPM version](https://badge.fury.io/js/ethereum-private-key-to-address.svg)](http://badge.fury.io/js/ethereum-private-key-to-address)

## Install

```bash
npm install ethereum-private-key-to-address
```

## Getting started

```javascript
const privateKeyToAddress = require('ethereum-private-key-to-address')

console.log(privateKeyToAddress(Buffer.from('4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d', 'hex'))) // '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
console.log(privateKeyToAddress('4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d')) // '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
console.log(privateKeyToAddress('0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d')) // '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
```

## CLI

Install:

```bash
npm install -g ethereum-private-key-to-address
```

Convert private key to public address:

```bash
$ ethereum_private_key_to_address 4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d

0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1
```

Piping private key example:

```bash
$ echo 4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d | ethereum_private_key_to_address

0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1
```

## Test

```bash
npm test
```

## License

[MIT](LICENSE)
