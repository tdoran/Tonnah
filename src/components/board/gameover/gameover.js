import React from "react";
import "./styles.css";

function Gameover(props) {
  return (
    <div className="gameover">
      <h2> Game Over </h2>
      <p> Your score was {props.score}</p>
    </div>
  );
}

export default Gameover;
