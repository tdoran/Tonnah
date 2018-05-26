import React from "react";
import "./style.css";

function Singlephoto(props) {
  return (
    <img
      className="board--singlephoto"
      src={props.titleUrl[0]}
      alt={props.titleUrl[1]}
      data-testid="singlephoto"
    />
  );
}

export default Singlephoto;
