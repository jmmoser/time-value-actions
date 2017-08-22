'use strict';

const EventEmitter = require('events');

class Sinewave extends EventEmitter {
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
    let t0 = this._startTime;
    let h = this._high;
    let l = this._low;
    let T = this._period;
    let to = this._offset;
    let g = Math.sin(2 * Math.PI * ((t - t0) + to) / T);
    let value = this._avg + g * this._rng;
    this.emit('value', value, time);
    return value;
  }
}

module.exports = Sinewave;
