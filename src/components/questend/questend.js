import React from 'react';
import './questend.css';

export default class QuestEnd extends React.Component {


  render(){
    //console.log(this.props);
    return (
      <div>
        <div>Grattis ditt spel avslutat</div>
        <div>{this.props.game.score}</div>
        <button onClick={ () => this.props.chooseCategori("") }>Nytt spel</button>
      </div>

    )
  }
}
