import React, { Component } from 'react';
import './questions.css';


class SingleQuest extends Component {
  constructor(props){
    super(props);
  } // constructor()

  render(){
    let displayElement;
    console.log(this.props.activeGame);
    if (this.props.activeGame) {
        displayElement= (<div>The game i active</div>)
    }else {
      let index = this.props.qurrentQuestion;
      let questionArray = this.props.questionArray;
      let question = questionArray[index].question;
      displayElement= (<div>{question}</div>)
    }

    return (<div>
            <h1>{displayElement}</h1>


          </div>);

  }// Render()

} // class SingleQuest

export default SingleQuest;
