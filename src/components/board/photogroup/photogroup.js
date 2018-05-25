import React from "react";
import "./style.css";

export default class Photogroup extends React.Component {
  render() {
    const { allPhotos } = this.props;
    return (
      <div>
        {allPhotos.map(photo => (
          <img
            className="board--photos"
            key={allPhotos.indexOf(photo)}
            src={photo[0]}
            alt={photo[1]}
            onClick={this.props.clickHandler(photo)}
          />
        ))}
      </div>
    );
  }
}
