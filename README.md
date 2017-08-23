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
```

# Use Cases

- Pair with a driver to control extruder RPMs to create custom purge procedures

# Documentation

## Engine

Activates and 'ticks' actions.

### Methods

```javascript
new Engine(options)
```

 - options
  - ```milliseconds``` Period of each tick in milliseconds

## Action

Emits values based on time.

### Methods

```javascript
activate(time)
```

Use to initialize the action.

```javascript
active(time)
```

Must return either 0 or 1.
  - 0: not active
  - 1: active

```javascript
tick(time)
```

Used to emit and return value.

# Events

```javascript
'value'
```

- value
  - the value emitted
- time
  - the time the value was emitted

---

# Sinewave Action

Emits values that make a sinewave.

# Constructor

```javascript
new Sinewave(high, low, period, offset)
```

- high
  - high value for sinewave
- low
  - low value for sinewave
- period
  - period of sinewave in milliseconds
- offset
  - offset of sinewave in milliseconds
