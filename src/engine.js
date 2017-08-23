'use strict';

const MINIMUM_MILLESECONDS = 10;
// const MINIMUM_MULTIPLIER = 1.01;

const timerFunc = Date.now;

class Engine {
  constructor(options) {
    this.setOptions(options);
    this._active = false;
    this._loopFunc = this._loop.bind(this);
  }

  setOptions(opts) {
    opts = opts || {};

    this._milleseconds = opts.milliseconds || 100;
    // this._multiplier = opts._multiplier || 1.1;

    if (this._milliseconds < MINIMUM_MILLESECONDS) {
      this._milliesconds = MINIMUM_MILLESECONDS;
    }

    // if (this._multiplier < MINIMUM_MULTIPLIER) {
    //   this._multiplier = MINIMUM_MULTIPLIER;
    // }

    return opts;
  }

  start(actions) {
    if (this._active) return;

    this._actions = actions;
    this._actionsLength = actions.length;

    let time = timerFunc();
    for (let i = 0; i < this._actionsLength; i++) {
      actions[i].activate(time);
    }

    this._active = true;
    this._t0 = time
    this._loop();
  }

  stop() {
    this._active = false;
  }

  // _loop() {
  //   if (!this._active) return;
  //
  //   let that = this;
  //
  //   that._handle(function() {
  //     let t1 = timerFunc();
  //
  //     if (t1 - that._t0 > that._milleseconds) {
  //       that._milleseconds = that._multiplier * (t1 - that._t0);
  //     }
  //
  //     that._tf = that._t0 + that._milleseconds;
  //     that._t0 += that._milleseconds;
  //
  //     setTimeout(that._loopFunc, that._tf - t1);
  //   });
  // }

  _loop() {
    if (!this._active) return;

    let that = this;

    that._handle(function() {
      let t1 = timerFunc();
      let _t1 = (t1 - that._t0) % that._milleseconds;

      that._t0 = t1 - _t1;
      that._tf = that._t0 + that._milleseconds;

      setTimeout(that._loopFunc, that._tf - t1);
    });
  }

  _handle(cb) {
    let t = timerFunc();
    for (let i = 0; i < this._actionsLength; i++) {
      this._actions[i].tick(t);
    }
    cb();
  }
}

module.exports = Engine;
