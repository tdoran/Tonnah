import React from "React";
import Timer from "./timer/timer.js";
import Singlephoto from "./singlephoto/singlephoto.js";
import Photogroup from "./photogroup/photogroup.js";
import Gameover from "./gameover/gameover.js";
import "./styles.css";
import {
  getData,
  pickSingle,
  makeImageArray,
  shuffle
} from "../../utils/datahelpers.js";

export default class Board extends React.Component {
  state = {
    score: 0,
    time: 5,
    singlePhoto: "",
    photoGroup: "",
    renderSinglePhoto: false,
    renderPhotoGroup: false,
    url: "",
    clickedPhoto: "abc",
    renderGameOver: false
  };

  timer = () => {
    const countDown = setInterval(() => {
      if (this.state.time === 0) {
        if (this.state.renderSinglePhoto) {
          this.setState({
            renderSinglePhoto: false,
            renderPhotoGroup: true,
            time: 6
          });
        } else {
          this.setState({ renderPhotoGroup: false, time: 6 });
          clearInterval(countDown);
        }
      }

      this.setState(prevState => {
        return { time: prevState.time - 1 };
      });
    }, 1000);
  };

  componentDidMount() {
    getData().then(data => {
      let gifArray = makeImageArray(data);
      this.setState({ photoGroup: gifArray });
    });
  }

  beginGame = () => {
    this.setState(() => {
      let pickedPhoto = pickSingle(this.state.photoGroup);
      return {
        renderSinglePhoto: true,
        singlePhoto: pickedPhoto,
        photoGroup: shuffle(this.state.photoGroup)
      };
    });
  };

  clickHandler = url => {
    return () => {
      if (url === this.state.singlePhoto) {
        this.setState(prevState => {
          return {
            score: prevState.score + 1,
            renderPhotoGroup: false,
            time: 5
          };
        });
        this.beginGame();
      } else {
        this.setState(prevState => {
          return {
            renderPhotoGroup: false,
            time: 0,
            renderGameOver: true
          };
        });
      }
    };
  };

  render() {
    const {
      score,
      time,
      singlePhoto,
      photoGroup,
      renderSinglePhoto,
      renderPhotoGroup,
      renderGameOver
    } = this.state;

    return (
      <div className="board">
        <h1 className="board--title">Gif, Set, Match</h1>
        <h2 className="board--instruction">
          <span className="board--instruction--keyword">See</span> a gif.{" "}
          <span className="board--instruction--keyword">Find</span> a gif.
        </h2>
        {!renderGameOver && <p className="board--score">score: {score}</p>}
        {renderGameOver && <Gameover score={score} />}

        {!renderSinglePhoto &&
          !renderPhotoGroup && (
            <button className="board--btn" onClick={this.beginGame}>
              {!renderGameOver ? "Go!" : "Play Again"}
            </button>
          )}

        {(renderSinglePhoto || renderPhotoGroup) && (
          <Timer time={time} timer={this.timer} rendered={renderSinglePhoto} />
        )}

        {renderSinglePhoto && <Singlephoto url={singlePhoto} />}

        {renderPhotoGroup && (
          <Photogroup urls={photoGroup} clickHandler={this.clickHandler} />
        )}
      </div>
    );
  }
}
