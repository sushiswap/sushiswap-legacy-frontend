# Fortmatic Javascript SDK

Fortmatic JavaScript SDK lets developers conveniently connect their web apps
to the Ethereum blockchain - allowing end-users to interact with their apps on
any modern browser, without requiring them to download any browser extensions or
mobile dApp browsers.

Master: [![CircleCI](https://circleci.com/gh/fortmatic/fortmatic-js/tree/master.svg?style=svg&circle-token=4eea8c24ee48663b2c6611e3b016e7d34e4e70ba)](https://circleci.com/gh/fortmatic/fortmatic-js/tree/master)
1.0.0-beta [![CircleCI](https://circleci.com/gh/fortmatic/fortmatic-js/tree/1.0.0-beta.svg?style=svg&circle-token=4eea8c24ee48663b2c6611e3b016e7d34e4e70ba)](https://circleci.com/gh/fortmatic/fortmatic-js/tree/1.0.0-beta)

## Documentation

See the [Developer Documentation](https://developers.fortmatic.com).

## Installation

Integrating your app with Fortmatic will need our npm package:

```bash
npm install --save fortmatic
```

Alternatively you can add this script tag to your app’s `<head>`:

```html
<script src="https://cdn.jsdelivr.net/npm/fortmatic/dist/fortmatic.js"></script>
```

## Usage

Sign up or log in to your [Developer Dashboard](https://dashboard.fortmatic.com) to receive API keys that will allow your app to interact with the Ethereum blockchain through Fortmatic.

You can then integrate by simply replacing your web3 provider with Fortmatic
provider. Now instead of the MetaMask Chrome Extension opening, a Fortmatic
modal will open instead - requiring no extra user downloads, and works on all
modern desktop and mobile Chrome, Safari and Firefox browsers.

```jspx
import Fortmatic from 'fortmatic';

// Create client and replace web3 provider
const fm = new Fortmatic('YOUR_API_KEY');
web3 = new Web3(fm.getProvider());

// Send transactions the way your are used to
web3.eth.sendTransaction({/* ... */});
```
