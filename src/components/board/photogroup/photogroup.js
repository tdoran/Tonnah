import React from "react";
import "./style.css";

export default class Photogroup extends React.Component {
  render() {
    const { urls } = this.props;
    return (
      <div>
        {urls.map(url => (
          <img
            className="board--singlephoto"
            key={urls.indexOf(url)}
            src={url}
          />
        ))}
      </div>
    );
  }
}
