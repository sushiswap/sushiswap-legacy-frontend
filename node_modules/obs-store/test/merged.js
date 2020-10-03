'use strict'

const test = require('tape')
const streamUtils = require('mississippi')
const pipe = streamUtils.pipe
const ObservableStore = require('../')
const MergedStore = require('../lib/merged')

test('MergedStore - basic', function(t){
  t.plan(1)
  
  const childStoreOne = new ObservableStore()
  const childStoreTwo = new ObservableStore()
  const mergedStore = new MergedStore([
    childStoreOne,
    childStoreTwo,
  ])

  childStoreOne.putState({ a: 1 })
  childStoreTwo.putState({ b: 2 })

  t.deepEqual(mergedStore.getState(), { a: 1, b: 2 }, 'mergedStore gets state from children')
})

test('MergedStore - child initState', function(t){
  t.plan(1)
  
  const childStoreOne = new ObservableStore({ a: 1 })
  const childStoreTwo = new ObservableStore({ b: 2 })
  const mergedStore = new MergedStore([
    childStoreOne,
    childStoreTwo,
  ])

  t.deepEqual(mergedStore.getState(), { a: 1, b: 2 }, 'mergedStore gets state from children')
})

test('MergedStore - overwrite init', function(t){
  t.plan(1)
  
  const childStoreOne = new ObservableStore({ a: 1 })
  const childStoreTwo = new ObservableStore({ a: 2 })
  const mergedStore = new MergedStore([
    childStoreOne,
    childStoreTwo,
  ])

  t.deepEqual(mergedStore.getState(), { a: 2 }, 'mergedStore overwrote state correctly')
})

test('MergedStore - set no overwrite', function(t){
  t.plan(1)
  
  const childStoreOne = new ObservableStore({ a: 1 })
  const childStoreTwo = new ObservableStore({ a: 2 })
  const mergedStore = new MergedStore([
    childStoreOne,
    childStoreTwo,
  ])

  childStoreOne.putState({ a: 3 })

  t.deepEqual(mergedStore.getState(), { a: 2 }, 'mergedStore overwrote new value with old value')
})


test('MergedStore - overwrite init', function(t){
  t.plan(1)
  
  const childStoreOne = new ObservableStore({ a: 1 })
  const childStoreTwo = new ObservableStore({ a: 2 })
  const mergedStore = new MergedStore([
    childStoreOne,
    childStoreTwo,
  ])

  childStoreTwo.putState({ a: 3 })

  t.deepEqual(mergedStore.getState(), { a: 3 }, 'mergedStore overwrote old value with new value')
})