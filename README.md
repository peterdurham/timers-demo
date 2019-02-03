# Stopwatch and Countdown timers

For this tutorial we will be using React and Javascript to build two timers, a stopwatch timer and a countdown timer. Both timers will utilize intervals in Javascript to keep track of time.

## Setup

To begin with, I will be using Create React App to build out the basic files we will need. Assuming you have Node installed, enter the command:

```javascript
npx create-react-app timers-demo
```

(or whatever name you choose for your application)

In order to simplify things, I will be deleting the following files in the project:

- `App.test.js`
- `index.css`
- `logo.svg`
- `serviceWorker.js`

If you deleted these files too, make sure remove unnecessary code `index.js`, which will now look like this:

`index.js`

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

In this project we will be building 2 separate timers. This will be a good time to make components for these timers. Add two files in the src folder called `Stopwatch.js` and `Countdown.js`. Set these files up as basic class based components so we can save our timer data.

We will also clean up the imports from `App.js` earlier as well as adding in our new components.
`App.js`

```javascript
import React, { Component } from "react";
import Stopwatch from "./Stopwatch";
import Countdown from "./Countdown";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Timers Demo</h1>
        <Stopwatch />
        <Countdown />
      </div>
    );
  }
}

export default App;
```

Now that the project is configured for a basic setup, test it out using the following command

```javascript
npm start
```

# Stopwatch

The stopwatch timer we are building will fulfill the following requirements:

- the timer will start at 0
- the timer will be able to stop and reset
- the `Stopwatch` component will display the time and control buttons

### Component state

Since we need to store the timer data, we will use React's state for this purpose. We will be keeping track of:

`timerOn`: boolean value for if the timer is on  
`timerStart`: the Unix Epoch (ms after 1970) time when the timer was first started  
`timerTime`: time (ms) that the timer has been running since start/reset

Add the following code to the `Stopwatch` component in the `Stopwatch.js` file

```javascript
state = {
  timerOn: false,
  timerStart: 0,
  timerTime: 0
};
```

### Starting the timer

Node allows us to set intervals as often as we like which will continuously repeat a given function. If we return a `setState` call, adjusting the time every 10ms. We can keep a very accurate stopwatch.

```javascript
startTimer = () => {
  this.setState({
    timerOn: true,
    timerTime: this.state.timerTime,
    timerStart: Date.now() - this.state.timerTime
  });
  this.timer = setInterval(() => {
    this.setState({
      timerTime: Date.now() - this.state.timerStart
    });
  }, 10);
};
```

This function, `startTimer` will be called when the timer is started or resumed. At first, it will use the `setState` method to turn the timer on, set the timer to represent the current time, and initialize the start time. Turning the timer on, and setting the `timerStart` date to `Date.now()` would be sufficient to start the timer, but we need to also account for `this.state.timerTime` in case the user is resuming the timer.

Next in the `startTimer` function, we will initialize a timer interval with `this.timer` which binds the timer interval to the `Stopwatch` method. This interval needs to return a method to call every time it goes off, and an interval time. In our return we can call `this.setState` to adjust the current `timerTime` to the number of miliseconds since `timerStart`.

### Stop and Reset

Now that the stopwatch is working, we can add in functions for `stop` and `reset`.

```javascript
stopTimer = () => {
  this.setState({ timerOn: false });
  clearInterval(this.timer);
};

resetTimer = () => {
  this.setState({
    timerStart: 0,
    timerTime: 0
  });
};
```

In the `stopTimer` method, we are setting `timerOn` to false and clearing the interval on `this.timer`.

The `resetTimer` method returns the `timerStart` and `timerTime` back to 0.

### Formatting

With all the functionality we need for a timer in order, we need a way to display the current time in `hours`, `minutes`, `seconds`, and `centiseconds`. Inside the render method of `Stopwatch.js`, before the return statement, add the following code:

```javascript
const { timerTime } = this.state;
let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
let hours = ("0" + (Math.floor(timerTime / 3600000)).slice(-2);
```

We have the value of the time we want to display stored in milliseconds in our state. First, we can destructure the `timerTime` to save so complexity. We are simply setting the variable `this.state.timerTime` to `timerTime`.

The modular arithmetic we are using here is finding the remainder of each unit of time we are using.

- `centiseconds` - 10 represents 1/100th of a second
- `seconds` - 1000 represents 1/60th of a minute
- `minutes` - 60000 represents 1/60th of an hour
- `hours` - 3600000 doesn't need a modulus if <100 hours

We are also formatting the times to display as 2 digits by concatenating a "0" on the front then slicing off the end if its more than 2 digits long.

### Controls

Lastly for the Stopwatch, we will need buttons to `start`, `stop`, `resume`, and `reset`. I have decided to conditionally render all 4 buttons depending on the status of the timer.

```javascript
{
  this.state.timerOn === false && this.state.timerTime === 0 && (
    <button onClick={this.startTimer}>Start</button>
  );
}
{
  this.state.timerOn === true && <button onClick={this.stopTimer}>Stop</button>;
}
{
  this.state.timerOn === false && this.state.timerTime > 0 && (
    <button onClick={this.startTimer}>Resume</button>
  );
}
{
  this.state.timerOn === false && this.state.timerTime > 0 && (
    <button onClick={this.resetTimer}>Reset</button>
  );
}
```

Buttons:  
`Start` - Show when the timer is off and the time is 0  
`Stop` - Show when the timer is on  
`Resume` - Show when the time is on, and the time is not 0  
`Reset` - Show when the timer is off, and the time is not 0

Great, now we have a working Stopwatch timer and all we need is some basic styling!

CSS

# Countdown
