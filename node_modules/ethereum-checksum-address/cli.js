const meow = require('meow')
const { toChecksumAddress, checkAddressChecksum } = require('.')

const cli = meow(`
    Usage
      $ ethereum_address_checksum <address> [flags]

    Options
      --check, -r  Check if address is a checksummed address

    Examples
      $ ethereum_address_checksum 0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1
      0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1

      $ ethereum_address_checksum 0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1 --check
      true
`, {
  flags: {
    check: {
      type: 'boolean'
    },
    chain: {
      type: 'string'
    }
  }
})


const address = cli.input[0]
const check = cli.flags.check
const chainId = cli.flags.chain

if (!address) {
  console.log('address argument is required')
  process.exit(1)
}

if (check) {
  const valid = checkAddressChecksum(address, chainId)
  console.log(valid)
  process.exit(valid ? 0 : 1)
} else {
  console.log(toChecksumAddress(address, chainId))
  process.exit(0)
}
