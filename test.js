const TVA = require('./index');

const Engine = TVA.Engine;

const SequenceAction = TVA.Actions.Sequence;
const SquarewaveAction = TVA.Actions.Squarewave;
const SinewaveAction = TVA.Actions.Sinewave;
const TimedAction = TVA.Actions.Timed;

// squarewave that oscillates between 20 and 50 every second, starts at the low value
const squarewave = new SquarewaveAction(50, 20, 1 * 1000, false);
// sinewave that oscillates between 20 and 50 with a period of 2 seconds, no offset
const sinewave = new SinewaveAction(50, 20, 2 * 1000, 0);

// Sequence action allows chaining actions together, repeats indefinitely
const sequence = new SequenceAction([
  new TimedAction(5 * 1000, squarewave), // squarewave for 5 seconds
  new TimedAction(2 * 1000), // delay for 2 seconds
  new TimedAction(5 * 1000, sinewave) // sinewave for 5 seoncds
]);

sequence.on('value', function(value) {
  // do something with the value
  console.log(value);
});

const engine = new Engine({milliseconds: 100});

engine.start([sequence]);
