'use strict';

const EventEmitter = require('events');

class TimedAction extends EventEmitter {
  constructor(milliseconds, childAction) {
    super();
    this._milliseconds = milliseconds;
    this._action = childAction;
  }

  activate(time) {
    this._startTime = time;
    if (this._action != null) this._action.activate(time);
  }

  active(time) {
    if (this._action != null && !this._action.active(time)) return 0;
    return (time - this._startTime) < this._milliseconds;
  }

  tick(time) {
    if (this._action) {
      let value = this._action.tick(time);
      if (value != null) {
        this.emit('value', value, time);
        return value;
      }
    }
  }
}

module.exports = TimedAction;
