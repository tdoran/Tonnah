import React from "React";
import Timer from "./timer/timer.js";

export default class Board extends React.Component {
  state = {
    score: 0,
    time: 5,
    singlePhoto: "",
    photoGroup: "",
    renderSinglePhoto: false
  };

  timer = () => {
    const countDown = setInterval(() => {
      if (this.state.time === 0) {
        this.setState({ renderSinglePhoto: false });
        clearInterval(countDown);
      }
      this.setState(prevState => {
        return { time: prevState.time - 1 };
      });
    }, 1000);
  };

  beginGame = () => {
    this.setState(() => {
      return {
        renderSinglePhoto: true
      };
    });
  };

  render() {
    const {
      score,
      time,
      singlePhoto,
      photoGroup,
      renderSinglePhoto
    } = this.state;

    return (
      <div className="board">
        <button onClick={this.beginGame}>GO!</button>
        {renderSinglePhoto && (
          <Timer time={time} timer={this.timer} rendered={renderSinglePhoto} />
        )}
      </div>
    );
  }
}
