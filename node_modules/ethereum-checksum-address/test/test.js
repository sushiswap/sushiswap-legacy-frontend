const test = require('tape')
const { toChecksumAddress, checkAddressChecksum } = require('../')

test('toChecksumAddress', t => {
  t.plan(4)

  t.equal(toChecksumAddress('0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1'), '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1')
  t.equal(toChecksumAddress('0x90F8BF6A479F320EAD074411A4B0E7944EA8C9C1'), '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1')

  // with chain id
  t.equal(toChecksumAddress('0xdbf03b407c01e7cd3cbea99509d93f8dddc8c6fb', 30), '0xDBF03B407c01E7CD3cBea99509D93F8Dddc8C6FB')
  t.equal(toChecksumAddress('0xd1220a0cf47c7b9be7a2e6ba89f429762e7b9adb', 30), '0xD1220A0Cf47c7B9BE7a2e6ba89F429762E7B9adB')
})

test('checkAddressChecksum', t => {
  t.plan(8)

  t.equal(checkAddressChecksum('0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'), true)
  t.equal(checkAddressChecksum('0x90F8BF6A479F320EAD074411A4B0E7944EA8C9C1'), false)
  t.equal(checkAddressChecksum('0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb'), true)
  t.equal(checkAddressChecksum('0XD1220A0CF47C7B9BE7A2E6BA89F429762E7B9ADB'), false)
  t.equal(checkAddressChecksum('0xd1220a0cf47c7b9be7a2e6ba89f429762e7b9adb'), false)

  // with chain id
  t.equal(checkAddressChecksum('0xd1220a0CF47c7B9Be7A2E6Ba89f429762E7b9adB', 31), true)
  t.equal(checkAddressChecksum('0XD1220A0CF47C7B9BE7A2E6BA89F429762E7B9ADB', 31), false)
  t.equal(checkAddressChecksum('0xd1220a0cf47c7b9be7a2e6ba89f429762e7b9adb', 31), false)
})
