
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./authereum-connector.cjs.production.min.js')
} else {
  module.exports = require('./authereum-connector.cjs.development.js')
}
