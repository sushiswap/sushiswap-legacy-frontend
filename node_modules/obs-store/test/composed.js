'use strict'

const test = require('tape')
const streamUtils = require('mississippi')
const pipe = streamUtils.pipe
const ObservableStore = require('../')
const ComposedStore = require('../lib/composed')

test('ComposedStore - basic', function(t){
  t.plan(1)
  
  const childStoreOne = new ObservableStore()
  const childStoreTwo = new ObservableStore()
  const composedStore = new ComposedStore({
    one: childStoreOne,
    two: childStoreTwo,
  })

  childStoreOne.putState(1)
  childStoreTwo.putState(2)

  t.deepEqual(composedStore.getState(), { one: 1, two: 2 }, 'composedStore gets state from children')

})

test('ComposedStore - child initState', function(t){
  t.plan(1)
  
  const childStoreOne = new ObservableStore(1)
  const childStoreTwo = new ObservableStore(2)
  const composedStore = new ComposedStore({
    one: childStoreOne,
    two: childStoreTwo,
  })

  t.deepEqual(composedStore.getState(), { one: 1, two: 2 }, 'composedStore gets state from children')

})
