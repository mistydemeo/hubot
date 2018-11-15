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
  set (key, value) {}

  // Public: Get value by key if in the database or return null
  // if not found.
  get (key) {}

  // Public: Set a value scoped specifically to this user.
  // `key` is unique per-user, rather than globally.
  //
  // Value can be any JSON-serializable type.
  set_user_value (user, key, value) {}

  // Public: Gets a value scoped specifically to this user.
  // `key` is unique per-user, rather than globally.
  get_user_value (user, key) {}
}

module.exports = DataStore
