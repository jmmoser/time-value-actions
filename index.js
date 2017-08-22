'use strict';

module.exports = {
  Engine: require('./src/engine'),
  LineAction: require('./src/lineaction'),
  ConcurrentAction: require('./src/concurrentaction'),
  Actions: {
    Concurrent: require('./src/actions/concurrent'),
    Sequence: require('./src/actions/sequence'),
    Timed: require('./src/actions/timed')
    Filter: require('./src/actions/filter'),
    Line: require('./src/actions/line'),
    Sinewave: require('./src/actions/sinewave'),
    Squarewave: require('./src/actions/squarewave'),
    Trianglewave: require('./src/actions/trianglewave')
  }
};
