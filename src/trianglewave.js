'use strict';

const EventEmitter = require('events');

class Trianglewave extends EventEmitter {
  constructor(high, low, period, offset) {
    super();
    this._high = high;
    this._low = low;
    this._period = period;
    this._offset = offset;
    this._avg = (high + low) / 2;
    this._rng = (high - low) / 2;
  }

  activate(time) {
    this._startTime = time;
  }

  active() {
    return 1;
  }

  tick(t) {
    // let h = this._high;
    let l = this._low;
    let p = this._period;
    let o = this._offset;
    let a = this._rng
    t = t - this._startTime;
    let value =  (2 * a / p) * (Math.abs(((t - o) % p) - p / 2) - p / 4) + l;
    this.emit('value', value, time);
    return value;
  }
}

module.exports = Trianglewave;
