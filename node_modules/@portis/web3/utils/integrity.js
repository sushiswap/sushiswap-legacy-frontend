const exec = require('child_process').exec;
const version = require('../package').version;

const myShellScript = exec('cat umd/index.js | openssl dgst -sha256 -binary | openssl base64 -A');
myShellScript.stdout.on('data', data => {
  console.log('----------------------------------------------');
  console.log('IMPORTANT!');
  console.log('Update packages/portis-docs/docs/installation.md');
  console.log('----------------------------------------------');
  console.log(`<script
  src="https://cdn.jsdelivr.net/npm/@portis/web3@${version}/umd/index.js"
  integrity="sha256-${data}"
  crossorigin="anonymous"
></script>`);
  console.log('----------------------------------------------');
});
