'use strict';

module.exports = {
  Engine: require('./src/engine'),
  Actions: {
    Custom: require('./src/actions/custom'),
    Sequence: require('./src/actions/sequence'),
    Timed: require('./src/actions/timed'),
    Filter: require('./src/actions/filter'),
    Line: require('./src/actions/line'),
    Sinewave: require('./src/actions/sinewave'),
    Squarewave: require('./src/actions/squarewave'),
    Trianglewave: require('./src/actions/trianglewave')
  }
};
