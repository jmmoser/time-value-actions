'use strict';

const EventEmitter = require('events');

class FilterAction extends EventEmitter {
  constructor(childAction, filter) {
    super();
    this._action = childAction;
    this._value = null;

    filter = filter || 0;
    this._filter = Math.abs(filter); // filter must be zero or positive number
  }

  activate(time) {
    this._action.activate(time);
  }

  active(time) {
    return this._action.active(time);
  }

  tick(time) {
    let value = this._action.tick(time);
    if (value != null) {
      if (this._value == null || Math.abs(value - this._value) > this._filter) {
        this._value = value;
        this.emit('value', value, time);
        return value;
      }
    }
  }
}

module.exports = FilterAction;
