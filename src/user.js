'use strict'

const DataStoreUnavailable = require('./datastore').DataStoreUnavailable

class User {
  // Represents a participating user in the chat.
  //
  // id      - A unique ID for the user.
  // options - An optional Hash of key, value pairs for this user.
  constructor (id, options) {
    this.id = id

    if (options == null) {
      options = {}
    }

    Object.keys(options).forEach((key) => {
      this[key] = options[key]
    })

    if (!this.name) {
      this.name = this.id.toString()
    }
  }

  set (key, value) {
    this._checkDatastoreAvailable()
    return this.datastore._set(this._constructKey(), value, 'users')
  }

  get (key) {
    this._checkDatastoreAvailable()
    return this.datastore._get(this._constructKey(), 'users')
  }

  _constructKey (key) {
    return `${this.id}+${key}`
  }

  _checkDatastoreAvailable () {
    if (!this.datastore) {
      throw new DataStoreUnavailable('this.datastore is not initialized')
    }
  }
}

module.exports = User
