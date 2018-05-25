import React from "React";

export default class Timer extends React.Component {
  state = {};

  componentDidMount() {
    this.props.timer();
  }

  render() {
    return <p className="board--timer"> {this.props.time} </p>;
  }
}
