<p align="center">
  <a href="https://squarelink.com/" target="_blank">
    <img alt="Squarelink" src="https://squarelink.com/img/logo.png?v=2" width="450">
  </a>
</p>

# Squarelink Web3 SDK
[![](https://img.shields.io/static/v1.svg?label=web&message=squarelink&color=14bcfe&style=flat&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH4wUQAxYUwPnEkAAAA9FJREFUeNrt2k+MJGMYx/FP78xaa2ebYYVscMDBnyyRbOKASIgDwsU6kBB/EgcXB9zccHF2IRH/IrJE3ES42YsgEmwiuyEEWWJZsjuLiZluh7dmU2qqq96unu6q6ulf0pd6337rfb71vs/7Pu/7MNNMM21mdfIe/nH877r7Fa3F7vbNDSCrYYGUAXgAN2G1bsNy9BN+xJc4iKUqIOZLyq/HfXVbWqLj+Axv4G2cIHzEGAhbSsp7dVsXoa4wSl9IIFy1VhAzlcsAtEnzuAP7cUMshGkCsKbL8CL2xFSeRgBrEJ7BAsWjoMwJ5mkZr+OI/FWkJzjPm3PKfsVr2Ih1dhf2CnN+W075rdiHV4oaqQLgHzyPLwrqPDkAwC94WvDcG6GzcGfS5kWZsq24F2/hr40EAHPkr7XJcCuaWvOD/hur1JD+UxhRHWHen5apeg0uwVeD2mqlD1jsbs8CfAcf5VQ9W+IMB/mBVgJIg0i0hM8H2HdeURutBpBRf8Dzi6caQIQv2VZUWNUJjk0jRKL9Kn9qFICM8TuxW7LilGgV57YaQMr4Dm7D47giARDzdXe0GkBKt+NVYQkbu5rmBLt4YlLGNxHAhbhyki9sGoC5SfepiT4gTz1h3190NrkDZ0wrgGO4H9/JHyGrQgT68LQCWMFhfFtQ52iVhtsCgPIQvDNke2ieE5y4ZgDq7kDdmgGouwN1q+oq0KMwdm/DlVplAFtwqXC2nxerr+D8ug0bJ4AF4Qh6paDO0FvSNgHoYLHi+yptVsapSTvBnxXc0mwGAO8LV2uN0SQBfCBcqjZKVXxAX4jNVyLqdoRbm/fwHH5j9MyuugEs4RHhwjHmyPqkkNDUxESrSgB6+AaHqrywSV+/KgAS39E0YyobUkGVrqHGoYirtBMbDWBOstNrWEbp1gHPvx8FwLGcZwtCbo66IaTevTPdp5R6+L2ojTIf8DH+tZ7ug8Km5tAEIfQL3nUXrs15flSSyzTIX5WNgE8Ej5/V1XgJN+J0YVqM+ivqTyep08n850zhKPxZ+XkAg/r/v4ZzlSL9lJCFlVtNyNM9afRAp58YdJ31yU7LOCDsQTqp+ruTj5Fn/DLuwbsMHgExAC5IGtmrXdqPhyTB19AAMhBuERKRKyUh1KCDgl84XGQ88cvgh3gMP9RtWaTxj8YYXwog8+c3hTl1QIM2QiktC1mh+5I+RinKcWWWnl24W0hD3SMkNdR10rO2zn+Kl4Wo89SBS8xWPbrjOetvV8jKvhznqGdUHMHXwnA/ddAyTIwy9Jdr2PZ3naYhQJtppplmmpj+A58k27POJ+PAAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTA1LTE2VDAzOjIyOjA1KzAwOjAwjcQYhwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wNS0xNlQwMzoyMjowNSswMDowMPyZoDsAAAAASUVORK5CYII=)](https://squarelink.com)
[![](https://img.shields.io/npm/v/squarelink.svg?color=14bcfe&style=flat)](https://npmjs.org/package/squarelink)
[![](https://img.shields.io/badge/chat-telegram-14bcfe.svg)](https://t.me/squarelink)
[![license](https://img.shields.io/badge/license-MIT-14bcfe.svg)](https://github.com/Squarelink-Inc/Squarelink-Web3/blob/master/LICENSE.txt)

This is the Squarelink Web3 SDK which enables Squarelink enhancements to standard Web3 JSON RPC requests.

Check out the **[Squarelink Documentation](https://docs.squarelink.com)** for more information, quick-start guides, etc.

## Installation

### Node
```bash
$ npm install squarelink
```

### CDN
```html
<script src="https://squarelink.com/js/squarelink.min.js"></script>
```

## Usage

First, register your application at **[dev.squarelink.com](https://dev.squarelink.com)** to obtain your `CLIENT ID`

```javascript
import Web3 from 'web3'
import Squarelink from 'squarelink'

const sqlk = new Squarelink('<CLIENT ID>')

// Use callback or Promise
sqlk.getProvider(provider => {
  const web3 = new Web3(provider)

  // Use the web3 library as you would normally!
  web3.currentProvider.enable()
})
```

### Configuration

`const sqlk = new Squarelink(clientId [, network][, opts])`

`Squarelink`-`Object` - Initializes a Squarelink Web3 Provider for you

- `clientId`-`String` - The Client ID provided to you when you register your DApp in the **[Squarelink Developer Console](https://dev.squarelink.com)**

- `network`-`String|Object` - Configures the RPC node you're connecting to. See **[a list of our available networks](https://docs.squarelink.com/#available-networks)**. Defaults to 'mainnet'.

- `opts` - `Object` - Pass additional options to the Squarelink SDK.

### Examples

```javascript
// connect to the Ropsten network
new Squarelink('<CLIENT ID>', 'ropsten')
```
```javascript
// connect to a custom private network
new Squarelink('<CLIENT ID>', {
  url: 'https://localhost:8545',
  chainId: 420
})
```

### Options (`opts`)

- `scope` - `Array` - Request additional scopes to use custom Squarelink functions.
- `useSync` - `Boolean` - See *getProviderSync* below for usage (default = false).

#### Available Scopes:
- `user` - Equivalent to all scopes below
- `user:name` - Access to read user's name
- `user:email` - Access to user's email address
- `user:security` - Access to read user's security settings

### Detecting Squarelink
```
web3.currentProvider.isSquarelink
```

### Additional Functions

- *Squarelink*.**getName()** - requires the `user` or `user:name` scope

- *Squarelink*.**getEmail()** - requires the `user` or `user:email` scope

- *Squarelink*.**getSecuritySettings()** - requires the `user` or `user:security` scope


### Initializing Squarelink Synchronously

The `getProvider` function fetches a list of our supported networks and their RPC endpoints from our API. This allows us to remotely switch RPC providers to ensure 100% uptime and remove faulty/compromised endpoints.

If you are unable to support callbacks/promises, you can use `getProviderSync` which uses hard-coded RPC endpoints. **NOTE**: *we cannot guarantee 100% uptime with this method.*

```javascript
const sqlk = new Squarelink('<CLIENT ID>', 'mainnet', { useSync: true })
const web3 = new Web(sqlk.getProviderSync())
```

## Documentation

**[https://docs.squarelink.com](https://docs.squarelink.com)**


## License

MIT
