
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./torus-connector.cjs.production.min.js')
} else {
  module.exports = require('./torus-connector.cjs.development.js')
}
