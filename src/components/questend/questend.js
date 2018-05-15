import React from 'react';
import './questend.css';

export default class QuestEnd extends React.Component {


  render(){
    return (
      <div className="questend-container">
        <div><h2>Grattis ditt spel avslutat</h2></div>
        <div><p>Du fick : {this.props.game.score} poäng!</p></div>
        <div><button onClick={ () => this.props.chooseCategori("") }>Nytt spel</button></div>
      </div>

    )
  }
}
