const meow = require('meow')
const privateKeyToAddress = require('.')

const cli = meow(`
    Usage
      $ ethereum_private_key_to_address <private-key>

 git@github.com:miguelmota/ethereum-private-key-to-public-key.git   Examples
      $ ethereum_private_key_to_address 4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d
      0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1
`, {
  flags: {}
})

let privateKey = cli.input[0]

if (process.stdin) {
  process.stdin.setEncoding('utf8')
  process.stdin.resume()
  let content = ''
  process.stdin.on('data', (buf) => {
    content += buf.toString()
  })
  setTimeout(() => {
    content = content.trim()

    if (content) {
      privateKey = content
    }

    run()
  }, 10)
} else {
  run()
}

function run() {
  if (!privateKey) {
    console.log('private key argument is required')
    process.exit(1)
  }

  console.log(privateKeyToAddress(privateKey))
  process.exit(0)
}
