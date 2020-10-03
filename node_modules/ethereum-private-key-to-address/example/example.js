const privateKeyToAddress = require('ethereum-private-key-to-address')

console.log(privateKeyToAddress(Buffer.from('4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d', 'hex'))) // '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
console.log(privateKeyToAddress('4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d')) // '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
console.log(privateKeyToAddress('0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d')) // '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
