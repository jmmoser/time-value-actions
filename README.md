# time-value-actions

Let me know if you have a better name for this module!

# Install

```sh
$ npm install time-value-actions
```

# Example

```javascript
const TVA = require('time-value-actions');

const Engine = TVA.Engine;

const SequenceAction = TVA.Actions.Sequence;
const SquarewaveAction = TVA.Actions.Squarewave;
const SinewaveAction = TVA.Actions.Sinewave;
const TimedAction = TVA.Actions.Timed;

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
