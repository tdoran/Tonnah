import React from "React";
import Timer from "./timer/timer.js";
import Singlephoto from "./singlephoto/singlephoto.js";

export default class Board extends React.Component {
  state = {
    score: 0,
    time: 5,
    singlePhoto: "",
    photoGroup: "",
    renderSinglePhoto: false,
    url: ""
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

        {renderSinglePhoto && (
          <Singlephoto url="https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2013/01/17/Production/Sunday/SunBiz/Images/268727_254043381379945_546402058_n.tif?t=20170517" />
        )}
      </div>
    );
  }
}
