const meow = require('meow')
const publicKeyToAddress = require('.')

const cli = meow(`
    Usage
      $ ethereum_public_key_to_address <public-key>

    Examples
      $ ethereum_public_key_to_address 04e68acfc0253a10620dff706b0a1b1f1f5833ea3beb3bde2250d5f271f3563606672ebc45e0b7ea2e816ecb70ca03137b1c9476eec63d4632e990020b7b6fba39
      0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1
`, {
  flags: {}
})


const publicKey = cli.input[0]

if (!publicKey) {
  console.log('public key argument is required')
  process.exit(1)
}

console.log(publicKeyToAddress(publicKey))
