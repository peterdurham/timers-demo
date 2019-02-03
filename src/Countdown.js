import React, { Component } from "react";

class Countdown extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  };

  starttimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
        alert("timer ended");
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };
  resetTimer = () => {
    if (this.state.timerOn === false) {
      this.setState({
        timerTime: this.state.timerStart
      });
    }
  };

  adjustTimer = input => {
    const { timerTime, timerOn } = this.state;
    if (!timerOn) {
      let newTime;
      if (input === "incHours" && timerTime + 3600000 < 216000000) {
        newTime = timerTime + 3600000;
      } else if (input === "decHours" && timerTime - 3600000 >= 0) {
        newTime = timerTime - 3600000;
      } else if (input === "incMinutes" && timerTime + 60000 < 216000000) {
        newTime = timerTime + 60000;
      } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
        newTime = timerTime - 60000;
      } else if (input === "incSeconds" && timerTime + 1000 < 216000000) {
        newTime = timerTime + 1000;
      } else if (input === "decSeconds" && timerTime - 1000 >= 0) {
        newTime = timerTime - 1000;
      }
      this.setState({ timerTime: newTime });
    }
  };

  render() {
    const { timerTime, timerStart, timerOn } = this.state;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    return (
      <div>
        <h1>timer</h1>
        <span className="Timer-label">H</span>
        <span className="Timer-label">M</span>
        <span className="Timer-label">S</span>
        <br />
        <button onClick={() => this.adjustTimer("incHours")}>^</button>
        <button onClick={() => this.adjustTimer("incMinutes")}>^</button>
        <button onClick={() => this.adjustTimer("incSeconds")}>^</button>
        <br />
        <span className="Timer-text">
          <span className="Individual-display">{hours}</span>:
          <span className="Individual-display">{minutes}</span>:
          <span className="Individual-display">{seconds}</span>
        </span>
        <br />
        <button onClick={() => this.adjustTimer("decHours")}>v</button>
        <button onClick={() => this.adjustTimer("decMinutes")}>v</button>
        <button onClick={() => this.adjustTimer("decSeconds")}>v</button>
        <br />
        <br />
        {timerOn === false && (timerStart === 0 || timerTime === timerStart) && (
          <button className="Button-start" onClick={this.startTimer}>
            Start
          </button>
        )}
        {timerOn === true && timerTime >= 1000 && (
          <button className="Button-stop" onClick={this.stoptimer}>
            Stop
          </button>
        )}
        {timerOn === false &&
          (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0) && (
            <button className="Button-start" onClick={this.startTimer}>
              Resume
            </button>
          )}

        {(timerOn === false || timerTime < 1000) &&
          (timerStart !== timerTime && timerStart > 0) && (
            <button className="Button-reset" onClick={this.resetTimer}>
              Reset
            </button>
          )}
      </div>
    );
  }
}

export default Countdown;
