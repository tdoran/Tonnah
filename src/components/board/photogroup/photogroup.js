import React from "react";
import "./style.css";

export default class Photogroup extends React.Component {
  render() {
    let i = 0;
    const { allPhotos } = this.props;
    return (
      <div>
        {allPhotos.map(photo => (
          <img
            className="board--photos"
            key={i++}
            src={photo[0]}
            alt={photo[1]}
            onClick={this.props.clickHandler(photo)}
          />
        ))}
      </div>
    );
  }
}
