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
    return this._set(key, value, "global");
  }

  // Public: Assuming `key` represents an object in the database,
  // sets its `object_key` to `value`. If `key` isn't already
  // present, it's instantiated as an empty object.
  set_object (key, object_key, value) {
    this.get(key).then((object) => {
      target = object || {};
      target[object_key] = value;
      return this.set(key, value);
    });
  }

  // Public: Adds the supplied value(s) to the end of the existing
  // array in the database marked by `key`. If `key` isn't already
  // present, it's instantiated as an empty array.
  set_array (key, value) {
    this.get(key).then((object) => {
      target = object || [];
      // Extend the array if the value is also an array, otherwise
      // push the single value on the end.
      if (Array.isArray(value)) {
        return this.set(key, target.push.apply(target, value));
      } else {
        return this.set(key, target.concat(value));
      }
    });
  }

  // Public: Get value by key if in the database or return null
  // if not found.
  get (key) {
    return this._get(key, "global");
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
