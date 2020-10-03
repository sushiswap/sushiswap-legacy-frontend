const meow = require('meow')
const privateKeyToPublicKey = require('.')

const cli = meow(`
    Usage
      $ ethereum_private_key_to_public_key <private-key>

    Examples
      $ ethereum_private_key_to_public_key 4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d
      04e68acfc0253a10620dff706b0a1b1f1f5833ea3beb3bde2250d5f271f3563606672ebc45e0b7ea2e816ecb70ca03137b1c9476eec63d4632e990020b7b6fba39
`, {
  flags: {}
})


const privateKey = cli.input[0]

if (!privateKey) {
  console.log('private key argument is required')
  process.exit(1)
}

console.log(privateKeyToPublicKey(privateKey).toString('hex'))
