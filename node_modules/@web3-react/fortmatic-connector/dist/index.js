
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./fortmatic-connector.cjs.production.min.js')
} else {
  module.exports = require('./fortmatic-connector.cjs.development.js')
}
