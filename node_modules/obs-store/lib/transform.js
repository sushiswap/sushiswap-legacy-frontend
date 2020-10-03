'use strict'

const TransformStream = require('through2').obj

module.exports = transformStore

function transformStore(syncTransformFn) {
  return TransformStream((state, enc, cb) => {
    try {
      const newState = syncTransformFn(state)
      cb(null, newState)
    } catch (err) {
      cb(err)
    }
  })
}