import React from "react";
import "./style.css";

function Photogroup(props) {
  let i = 0;
  const { allPhotos } = props;
  return (
    <div>
      {allPhotos.map(photo => (
        <img
          className="board--photos"
          key={i++}
          src={photo[0]}
          alt={photo[1]}
          onClick={props.clickHandler(photo)}
        />
      ))}
    </div>
  );
}

export default Photogroup;
