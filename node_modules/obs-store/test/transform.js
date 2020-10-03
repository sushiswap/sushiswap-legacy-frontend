'use strict'

const test = require('tape')
const ObservableStore = require('../')
const storeTransform = require('../lib/transform')
const asStream = require('../lib/asStream')
const streamUtils = require('mississippi')
const pipe = streamUtils.pipe


test('storeTransform test', function(t){
  t.plan(4)

  const initState = 'init'
  const nextState = 'next'

  const metaWrapperTransform = storeTransform((state) => {
    const newState = { meta: true, data: state }
    return newState
  })
  
  const storeOne = new ObservableStore(initState)
  const storeTwo = new ObservableStore()
  storeTwo.once('update', (value) => {
    initValueCheck(value)
    storeTwo.once('update', nextValueCheck)
  })

  pipe(
    asStream(storeOne),
    metaWrapperTransform,
    asStream(storeTwo)
  )

  storeOne.putState(nextState)

  function initValueCheck(value){
    t.equal(value.meta, true, 'storeTwo subscribed: state is wrapped in meta')
    t.equal(value.data, initState, 'storeTwo subscribed: state.data is initState')
  }

  function nextValueCheck(value){
    t.equal(value.meta, true, 'storeTwo subscribed: state is wrapped in meta')
    t.equal(value.data, nextState, 'storeTwo subscribed: state.data is nextState')
  }

})
