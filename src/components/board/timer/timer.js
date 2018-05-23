import React from "React";

export default class Timer extends React.Component {
  state = {};

  componentDidMount() {
    this.props.timer();
  }

  render() {
    return (
      <React.Fragment>
        <p className="board--timer"> {this.props.time} </p>
      </React.Fragment>
    );
  }
}
