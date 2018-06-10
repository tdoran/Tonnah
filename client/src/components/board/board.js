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
    renderGameOver: false,
    endScore: 0
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
          this.setState({
            renderPhotoGroup: false,
            time: 6,
            renderGameOver: true,
            endScore: this.state.score,
            score: 0
          });
          clearInterval(countDown);
        }
      }

      this.setState(prevState => {
        return { time: prevState.time - 1 };
      });
    }, 1000);
  };

  componentDidMount() {
    getData()
      .then(
        data => {
          let gifArray = makeImageArray(data);
          this.setState({ photoGroup: gifArray });
        },
        err => {
          console.log("Fetch error: ", err.message);
        }
      )
      .catch(err => console.log(err.message));
  }

  beginGame = () => {
    this.setState(() => {
      let pickedPhoto = pickSingle(this.state.photoGroup);
      return {
        renderSinglePhoto: true,
        singlePhoto: pickedPhoto,
        photoGroup: shuffle(this.state.photoGroup),
        renderGameOver: false
      };
    });
  };

  clickHandler = photo => {
    let url = photo[0];
    return () => {
      if (url === this.state.singlePhoto[0]) {
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
      renderGameOver,
      endScore
    } = this.state;

    return (
      <div className="board">
        <h1 className="board--title">Gif, Set, Match</h1>
        <h2 className="board--instruction">
          <span className="board--instruction--keyword">See</span> a gif.{" "}
          <span className="board--instruction--keyword">Find</span> a gif.
        </h2>
        {!renderGameOver && <p className="board--score">score: {score}</p>}
        {renderGameOver && <Gameover score={endScore} />}

        {!renderSinglePhoto &&
          !renderPhotoGroup && (
            <button className="board--btn" onClick={this.beginGame}>
              {!renderGameOver ? "Go!" : "Play Again"}
            </button>
          )}

        {(renderSinglePhoto || renderPhotoGroup) && (
          <Timer time={time} timer={this.timer} rendered={renderSinglePhoto} />
        )}

        {renderSinglePhoto && <Singlephoto titleUrl={singlePhoto} />}

        {renderPhotoGroup && (
          <Photogroup allPhotos={photoGroup} clickHandler={this.clickHandler} />
        )}
      </div>
    );
  }
}
