
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./portis-connector.cjs.production.min.js')
} else {
  module.exports = require('./portis-connector.cjs.development.js')
}
