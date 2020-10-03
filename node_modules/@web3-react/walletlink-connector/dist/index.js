
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./walletlink-connector.cjs.production.min.js')
} else {
  module.exports = require('./walletlink-connector.cjs.development.js')
}
