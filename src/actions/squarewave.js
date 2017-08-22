'use strict';

const EventEmitter = require('events');

class Squarewave extends EventEmitter {
  constructor(high, low, period, startHigh) {
    super();
    this._high = high;
    this._low = low;
    this._period = period;
    this._offset = startHigh ? 0 : period;
  }

  activate(time) {
    this._startTime = time - 1; // offset time by one to fix 'zero' problem
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
    let g = Math.sin(((t - t0 + to) / T) * Math.PI);
    let s = g > 0 ? 1 : -1;
    let value = (h + l + (h - l) * s) / 2;
    this.emit('value', value, time);
    return value;
  }
}

module.exports = Squarewave;
