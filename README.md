# time-value-engine

Let me know if you have a better name for this module!


# example

```javascript
const TVE = require('time-value-engine');

const Engine = TVE.Engine;

const SequenceAction = TVE.Actions.Sequence;
const SquarewaveAction = TVE.Actions.Squarewave;
const SinewaveAction = TVE.Actions.Sinewave;
const TimedAction = TVE.Actions.Timed;

const squarewave = new SquarewaveAction(50, 20, 1 * 1000, false);
const sinewave = new SinewaveAction(50, 20, 2 * 1000, 0);

const sequence = new SequenceAction([
  new TimedAction(5 * 1000, squarewave),
  new TimedAction(2 * 1000),
  new TimedAction(5 * 1000, sinewave)
]);

const engine = new Engine({milliseconds: 100});

engine.start([sequence]);

sequence.on('value', function(value) {
  console.log(value);
});
```
