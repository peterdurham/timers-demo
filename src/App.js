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
