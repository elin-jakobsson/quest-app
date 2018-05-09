import React, { Component } from 'react';
import './questions.css';
import SingleQuest from './singlequest';


class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionArray: props.questionArray

    }
  }

  // Shuffle function send in object and the function shuffles the in a random order
  shuffleArray=(array)=>{
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex -= 1;

     temporaryValue = array[currentIndex];
     array[currentIndex] = array[randomIndex];
     array[randomIndex] = temporaryValue;
 } // shuffle loop

    //return array;
  let questElements = array.map((x,index) => {
      let alternativList = x.alternativ.map((z,index)=>{
        return(
        <label key={'radio'+ index}><input type="radio" name={'quiz'+z.index} value=""/>{z}</label>
      )});
    return(<div key={'quets' + index}>
       <h1>{x.quest}</h1>
       <div>
       {alternativList}
       </div>
   </div>);
 });

 return questElements;
} // Shuffle()

  render() {
    return (
      <div>

        {this.shuffleArray(this.state.questionArray)}

      </div>
    );
  }
}

export default Questions;
