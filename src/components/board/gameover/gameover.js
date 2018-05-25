import React from "react";
import "./styles.css";

export default class Gameover extends React.Component {
  render() {
    return (
      <div className="gameover">
        <h2> Game Over </h2>
        <p> Your score was {this.props.score}</p>
      </div>
    );
  }
}
