# Stopwatch and Countdown timers

For this tutorial we will be using React and Javascript to build two timers, a stopwatch timer and a countdown timerBoth timers will utilize intervals in Javascript to keep track of time.

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

After removing unnecessary code and adding a title `App.js` and `index.js` will now look like this:

`App.js`

```javascript
import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Timers Demo</h1>
      </div>
    );
  }
}

export default App;
```

index.js

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

Now that the project is configured for a basic setup, we can test it out using the following command

```javascript
npm start
```

# Stopwatch timer

The first timer we will be coding will start at 0. When the user selects the start button the stopwatch will display the time since it started in hours, minutes, seconds, and miliseconds. The user can also stop and reset the timer.
