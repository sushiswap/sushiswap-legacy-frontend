'use strict'

const MergedStore = require('../')


class ComposedStore extends MergedStore {

  constructor (children = []) {
    super()
    // set default state
    const state = this.getState()
    if (!state) this.putState({})
    this._children = children
    // subscribe to children
    children.forEach((child) => this._addChild(child))
    this._updateWholeState()
  }

  _addChild (child) {
    child.subscribe(() => this._updateWholeState())
  }

  _updateWholeState() {
    const childStates = this._children.map((child) => child.getState())
    // apply shallow merge over states
    childStates.unshift({})
    const state = Object.assign.apply(null, childStates)
    this.putState(state)
  }

}

module.exports = ComposedStore