'use strict';

const EventEmitter = require('events');

class ConcurrentAction extends EventEmitter {
  constructor(actions) {
    super();
    this._actions = actions;
    this._activesLength = actions.length;
  }

  activate(time) {
    this._startTime = time;
    for (let i = 0; i < this._actionsLength; i++) {
      this._actions[i].activate(time);
    }
  }

  active(time) {
    for (let i = 0; i < this._actionsLength; i++) {
      if (this._actions[i].active(time)) {
        return 1;
      }
    }
    return 0;
  }

  tick(time) {
    // let values = [];
    // for (let i = 0; i < this._actionsLength; i++) {
    //   values.push(this._actions[i].tick(tick));
    // }
    // this.emit('value', values);
    // return value;

    for (let i = 0; i < this._actionsLength; i++) {
      this._actions[i].tick(tick);
    }
  }
}

module.exports = ConcurrentAction;
