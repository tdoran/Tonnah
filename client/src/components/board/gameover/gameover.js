import React from "react";
import "./styles.css";
import styled from "styled-components";

const Scoreboard = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  margin: 3rem auto;
  padding: 0.5rem 0rem;
`;

function Gameover(props) {
  let i = 0;
  const { score, allScores } = props;
  return (
    <div className="gameover">
      <h2> Game Over </h2>
      <p> Your score was {score}</p>

      <Scoreboard>
        {allScores.map(oneScore => (
          <div key={i++}>
            <p className="board--photos">{oneScore.name.S}</p>
            <p className="board--photos">{oneScore.score.N}</p>
          </div>
        ))}
      </Scoreboard>
    </div>
  );
}

export default Gameover;
