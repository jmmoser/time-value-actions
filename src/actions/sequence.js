'use strict';

const EventEmitter = require('events');

class SequenceAction extends EventEmitter {
  constructor(actions) {
    super();
    this._actions = actions;
    this._actionsLength = actions.length;
  }

  activate(time) {
    this._startTime = time;
    this._index = 0;
    this._actions[this._index].activate(time);
  }

  active(time) {
    return 1;
  }

  tick(time) {
    let index;
    let currentActionActive = this._actions[this._index].active(time);
    if (!currentActionActive) {
      this._index = (this._index + 1) % this._actionsLength;
      this._actions[this._index].activate(time);
    }

    let value = this._actions[this._index].tick(time);

    if (value) {
      this.emit('value', value, time);
      return value;
    }
  }
}

module.exports = SequenceAction;
