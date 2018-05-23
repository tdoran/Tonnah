import React from 'React';

export default class Board extends React.Component {
    state = {
        score: 0, 
        time: 0, 
        singlePhoto: '',
        photoGroup: '',
    }

    render() {
    return(
        <div className="board">
        Welcome to our Game!
        
        </div>
    )
    }
    
}