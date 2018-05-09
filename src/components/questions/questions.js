import React, { Component } from 'react';
import './questions.css';
import Timer from '../timer/timer'


class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionArray: props.questionArray,
      changequest : false

    }
  }
// Function that will change state when the timer ends
  timesUp = (timerFinished) => {
      if (timerFinished) {
          this.setState({changequest : true}, () => {
            console.log("Changequest status : " + this.state.changequest);
          })
      }
  }

  // Shuffle function send in object and the function shuffles the in a random order
  shuffleArray=(array)=>{
    // currentIndex the length of the array
    let currentIndex = array.length, temporaryValue, randomIndex;
    console.log(currentIndex);
 // While there remain elements to shuffle...
    while (0 !== currentIndex) {

   randomIndex = Math.floor(Math.random() * currentIndex);
   currentIndex -= 1;

   temporaryValue = array[currentIndex];
   array[currentIndex] = array[randomIndex];
   array[randomIndex] = temporaryValue;

 }

 // Fåge display för testvarianten
  let questElements = array.map((x,index) => {
      let alternativList = x.alternativ.map((z,index)=>{
        return(
        <label key={'radio'+ index}><input type="radio" name={'quiz'+z.index} value=""/>{z}</label>
      )});
    return(<div key={'quets' + index}>
       <h1>{x.quest}</h1>
       <form>
       {alternativList}
       </form>
   </div>);
 });

 return questElements;
}

  render() {
    return (
      <div>
        <Timer startValue={10} timeBool={false} timesUp={this.timesUp} />
        {this.shuffleArray(this.state.questionArray)}

      </div>
    );
  }
}

export default Questions;
