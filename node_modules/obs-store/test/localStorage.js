'use strict'

const test = require('tape')
const LocalStorageStore = require('../lib/localStorage')


test('localStorage - localStorage presence validation', function(t){
  t.plan(2)

  t.notOk(global.localStorage, 'global.localStorage not defined')

  t.throws(() => {
    new LocalStorageStore({ storageKey: 'test' })
  }, Error, 'throws error when localStorage is not defined')

})

test('localStorage - storageKey validation', function(t){
  t.plan(2)

  global.localStorage = createLocalStorage()

  t.ok(global.localStorage, 'global.localStorage is defined')

  t.throws(() => {
    new LocalStorageStore()
  }, Error, 'throws error when opts.storageKey is not defined')

})

test('localStorage - basic test', function(t){
  t.plan(2)

  global.localStorage = createLocalStorage()

  t.ok(global.localStorage, 'global.localStorage is defined')

  const store = new LocalStorageStore({ storageKey: 'test' })
  store.putState(42)

  t.equal(store.getState(), 42, 'store works roundtrips values great')
})

test('localStorage - obj test', function(t){
  t.plan(2)

  global.localStorage = createLocalStorage()

  t.ok(global.localStorage, 'global.localStorage is defined')

  const store = new LocalStorageStore({ storageKey: 'test' })
  store.putState({ a: 123 })

  t.deepEqual(store.getState(), { a: 123 }, 'store works roundtrips obj values great')
})

function createLocalStorage() {
  const values = {}
  const localStorage = {}
  localStorage.getItem = (key) => values[key]
  localStorage.setItem = (key, value) => values[key] = value
  return localStorage
}