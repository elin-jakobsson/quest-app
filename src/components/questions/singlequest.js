import React, { Component } from 'react';
import './questions.css';


class SingleQuest extends Component {
  constructor(props){
    super(props);
  } // constructor()

  render(){
    let index = this.props.qurrentQuestion;
    let questionArray = this.props.questionArray;
    let question = questionArray[index].question;
    console.log(index);
    console.log(question);
    return (<div>
            <h1>{question}</h1>


          </div>);

  }// Render()

} // class SingleQuest

export default SingleQuest;
