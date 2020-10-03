
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./frame-connector.cjs.production.min.js')
} else {
  module.exports = require('./frame-connector.cjs.development.js')
}
