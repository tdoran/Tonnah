import React from "React";
import Timer from "./timer/timer.js";
import Singlephoto from "./singlephoto/singlephoto.js";
import { pickSingle } from "../../utils/datahelpers.js";

let photoGroupApi = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Hot_dog_with_mustard.png/1200px-Hot_dog_with_mustard.png",
  "https://content.freddysusa.com/wp-content/uploads/2016/03/veggie-burger.png",
  "http://kannii.com/wp-content/uploads/2017/07/chips.png",
  "https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2013/01/17/Production/Sunday/SunBiz/Images/268727_254043381379945_546402058_n.tif?t=20170517"
];

export default class Board extends React.Component {
  state = {
    score: 0,
    time: 5,
    singlePhoto: "",
    photoGroup: photoGroupApi,
    renderSinglePhoto: false,
    renderPhotoGroup: false,
    url: "",
    groupUrls: []
  };

  timer = () => {
    const countDown = setInterval(() => {
      if (this.state.time === 0) {
        this.setState({ renderSinglePhoto: false, time: 6 });
        clearInterval(countDown);
      }
      this.setState(prevState => {
        return { time: prevState.time - 1 };
      });
    }, 1000);
  };

  beginGame = () => {
    this.setState(() => {
      let pickedPhoto = pickSingle(this.state.photoGroup);
      return {
        renderSinglePhoto: true,
        singlePhoto: pickedPhoto
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

        {renderSinglePhoto && <Singlephoto url={singlePhoto} />}
      </div>
    );
  }
}
