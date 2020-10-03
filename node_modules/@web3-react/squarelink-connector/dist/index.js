
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./squarelink-connector.cjs.production.min.js')
} else {
  module.exports = require('./squarelink-connector.cjs.development.js')
}
