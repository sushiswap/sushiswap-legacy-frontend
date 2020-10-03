const { toChecksumAddress, checkAddressChecksum } = require('ethereum-checksum-address')

console.log(toChecksumAddress('0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1')) // '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
console.log(toChecksumAddress('0x90F8BF6A479F320EAD074411A4B0E7944EA8C9C1')) // '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'

console.log(checkAddressChecksum('0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1')) // true

console.log(checkAddressChecksum('0x90F8BF6A479F320EAD074411A4B0E7944EA8C9C1')) // false
