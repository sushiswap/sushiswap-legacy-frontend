'use strict'

const ObservableStore = require('../')


class ComposedStore extends ObservableStore {

  constructor (children) {
    super()
    // set default state
    let state = this.getState()
    if (!state) this.putState({})
    // subscribe to children
    this._children = children || {}
    Object.keys(this._children).forEach((childKey) => {
      let child = this._children[childKey]
      this._addChild(childKey, child)
    })
  }

  _addChild (childKey, child) {
    const self = this
    child.subscribe(updateFromChild)
    updateFromChild(child.getState())

    function updateFromChild(childValue) {
      let state = self.getState()
      state[childKey] = childValue
      self.putState(state)
    }
  }

}

module.exports = ComposedStore