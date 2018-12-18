'use strict'

const DataStoreUnavailable = require ('./datastore').DataStoreUnavailable

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
    this._check_datastore_available();
    this.datastore._set(this._construct_key(), value, "users");
  }

  get (key) {
    this._check_datastore_available();
    this.datastore._get(this._construct_key(), "users");
  }

  _construct_key (key) {
    return `${user.id}+${key}`;
  }

  _check_datastore_available () {
    if (!this.datastore) {
      throw new DataStoreUnavailable('this.datastore is not initialized');
    }
  }
}

module.exports = User
