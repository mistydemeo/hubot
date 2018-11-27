'use strict'

const User = require('./user')

class DataStore {
  constructor(robot) {
    this.robot = robot
  }

  // Public: Set value for key in the database. Overwrites existing
  // values if present. Returns the value.
  //
  // Value can be any JSON-serializable type.
  set (key, value) {
    return _set(key, value, "global");
  }

  // Public: Get value by key if in the database or return null
  // if not found.
  get (key) {
    return _get(key, value, "global");
  }

  _set (key, value, table) {
    return Promise.reject(new DataStoreUnavailable("Setter called on the abstract class."));
  }

  _get (key, table) {
    return Promise.reject(new DataStoreUnavailable("Getter called on the abstract class."));
  }
}

class DataStoreUnavailable extends Error {}

module.exports = {
  DataStore,
  DataStoreUnavailable
}
