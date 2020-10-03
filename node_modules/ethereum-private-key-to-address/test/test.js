const test = require('tape')
const privateKeyToAddress = require('../')

test('privateKeyToAddress', t => {
  t.plan(3)

  t.equal(privateKeyToAddress(Buffer.from('4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d', 'hex')), '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1')
  t.equal(privateKeyToAddress('4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d'), '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1')
  t.equal(privateKeyToAddress('0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d'), '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1')
})
