'use strict'

const test = require('tape')
const ObservableStore = require('../')

const TEST_WAIT = 200


test('basic', function(t){
  t.plan(3)

  const initState = 'init'
  const nextState = 'next'
  
  const store = new ObservableStore(initState)
  store.subscribe(valueCheck)

  const firstState = store.getState()
  t.equal(store.getState(), initState, 'state is provided initState')
  
  store.putState(nextState)
  t.equal(store.getState(), nextState, 'state is nextState')

  function valueCheck(value){
    t.equal(value, nextState, 'subscribed: state is nextState')
  }

})

test('updateState', function(t){
  t.plan(2)
  
  const storeOne = new ObservableStore({ a: true, b: false })

  storeOne.updateState({ b: true })
  const state = storeOne.getState()

  t.equal(state.a, true, 'a is present')
  t.equal(state.b, true, 'b was updated to true')
})

test('updateState non-obj onto obj', function(t){
  t.plan(2)
  
  const storeOne = new ObservableStore({ a: true })

  storeOne.updateState(2)
  const state = storeOne.getState()

  t.equal(state, 2, 'obj is wholly overwritten by value')
  t.equal(state.a, undefined, 'property is not merged onto value')
})

test('updateState obj onto non-obj', function(t){
  t.plan(2)
  
  const storeOne = new ObservableStore(2)

  storeOne.updateState({ a: true })
  const state = storeOne.getState()

  t.equal(typeof state, 'object', 'value is wholly overwritten by object')
  t.equal(state.a, true, 'a is present')
})

