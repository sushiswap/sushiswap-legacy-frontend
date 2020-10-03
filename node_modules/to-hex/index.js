const normalizeHex = require('normalize-hex')

function toHex (value, opts = {}) {
  opts = {
    size: 0,
    addPrefix: false,
    evenLength: false,
    default: '',
    ...opts
  }

  var result = ''

  if (opts.default !== '') {
    result = opts.default
  }

  if (value === '' || value === undefined || value === null) {
    value = result
  }

  if (value === '0') {
    value = 0
  }

  if (value === undefined || value === null) {
      // noop
  } else if (typeof value === 'number') {
    result = value.toString(16)
  } else if (typeof value === 'string') {
    value = value.trim()
    if (value.startsWith('0x')) {
      result = normalizeHex(value)
    } else if (value !== '' && Number.isFinite(+value)) {
      result = Number(value).toString(16)
    }

    if (result === opts.default) {
      result = Buffer.from(value, 'utf8').toString('hex')
    }
  } else if (typeof value === 'boolean') {
    result = value ? '1' : '0'
  } else if (typeof value === 'object' && value !== null) {
    if (Buffer.isBuffer(value)) {
      result = value.toString('hex')
    } else if (/(BN|BigNumber|Big|Decimal)/.test(value.constructor.name)) {
      result = value.toString(16)
    } else if (value instanceof Uint8Array) {
      result = Buffer.from([
        ...value
      ]).toString('hex')
    } else if (value.toString && typeof value.toString === 'function') {
      try {
        const h = value.toString(16)
        if (/^[a-fA-F0-9]+$/.test(h)) {
          result = h
        }
      } catch (err) {
        // noop
      }
    }
  }

  if (typeof result === 'string') {
    result = result.toLowerCase()

    if (opts.size > result.length) {
      result = `${'0'.repeat(opts.size - result.length)}${result}`
    }

    if (opts.evenLength && result.length % 2) {
      result = `0${result}`
    }

    if (opts.addPrefix) {
      result = `0x${result}`
    }
  }

  return result
}

module.exports = toHex
