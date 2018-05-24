import React from "react";

export default class Gameover extends React.Component {
  render() {
    return (
      <div>
        <h2>Game Over!</h2>
        <p>Your score was {this.props.score}</p>
      </div>
    );
  }
}
