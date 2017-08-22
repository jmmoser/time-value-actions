'use strict';

const EventEmitter = require('events');

class CustomAction extends EventEmitter {
  constructor(activateHandler, activeHandler, tickHandler) {
    super();
    this._activateHandler = activeHandler.bind(this);
    this._activeHandler = activeHandler.bind(this);
    this._tickHandler = tickHandler.bind(this);
  }

  activate(time) {
    this._activateHandler(time);
  }

  active(time) {
    return this._activeHandler(time);
  }

  tick(time) {
    let value = this._tickHandler(time);
    this.emit('value', value, time);
    return value;
  }
}

module.exports = CustomAction;
