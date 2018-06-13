import React from "react";

export default class Timer extends React.Component {
  state = {};

  componentDidMount() {
    this.props.timer();
  }

  render() {
    return (
      <p className="board--timer" data-testid="timer">
        {" "}
        {this.props.time}{" "}
      </p>
    );
  }
}
