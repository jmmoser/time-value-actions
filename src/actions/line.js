'use strict';

const EventEmitter = require('events');

class Line extends EventEmitter {
  constructor(slope, intercept) {
    super();
    this._slope = slope;
    this._intercept = intercept;
  }

  activate(time) {
    this._startTime = time;
  }

  active() {
    return 1;
  }

  value(time) {
    let value = this._slope * (time - this._startTime) + this._intercept;
    this.emit('value', value, time);
    return value;
  }
}

module.exports = Line;
