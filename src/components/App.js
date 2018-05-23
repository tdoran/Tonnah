import React from "react";
import Board from "./board/board.js";

export default class App extends React.Component {
    render() {
        return(
            <React.Fragment>
                <Board />
            </React.Fragment>
        )
    }
}