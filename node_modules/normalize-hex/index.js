function normalizeHex (hex, opts) {
  opts = {
    evenLength: false,
    addPrefix: false,
    ...opts
  }

  let value = ''

  if (Buffer.isBuffer(hex)) {
    hex = hex.toString('hex')
  }

  if (typeof hex === 'number') {
    hex = hex.toString()
  }

  if (typeof hex === 'string') {
    value = hex.toLowerCase()
  }

  if (value.startsWith('0x')) {
    value = value.slice(2)
  }

  const data = (value.length % 2) ? `0${value}` : value
  if (Buffer.from(data, 'hex')) {
    value = opts.evenLength ? data : value
  }

  if (opts.addPrefix) {
    value = `0x${value}`
  }

  return value
}

module.exports = normalizeHex
