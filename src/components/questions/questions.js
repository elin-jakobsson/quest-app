import React, { Component } from 'react';
import './questions.css';
import SingleQuest from './singlequest';

// vad jag ska göra
/*
  Lägg till fler fråger på firebase HTML, CSS och JS
  ta emot en lista
  shuffla listan och ta ut 10 random frågor.


  jag får hela listan av games från app.js
  jag får hela listan av questions från app.js

  if sats -- har användaren ett pågående spel inom denna kategori, if true, hämta den redan existerande questtion list från games.


  lägg till två nys state
  allgames
  allquestions

  skickas senare till question komponenten singlequest
*/


class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allQuests: this.props.quests,
      allGames:this.props.games

    }
  }

  shuffleArray=(array)=>{
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex -= 1;

     temporaryValue = array[currentIndex];
     array[currentIndex] = array[randomIndex];
     array[randomIndex] = temporaryValue;
 } // shuffle loop

    return array;
  // let questElements = array.map((x,index) => {
  //     let alternativList = x.alternativ.map((z,index)=>{
  //       return(
  //       <label key={'radio'+ index}><input type="radio" name={'quiz'+z.index} value=""/>{z}</label>
  //     )});
  //   return(<div key={'quets' + index}>
  //      <h1>{x.quest}</h1>
  //      <div>
  //      {alternativList}
  //      </div>
  //  </div>);
 // });

 // return questElements;
} // Shuffle()

  render() {
    // Vad man får i props
    console.log( this.state.allQuests);
    console.log( this.state.allGames);
    return (
      <div>
        <SingleQuest/>
        {this.state.allQuests}
      </div>
    );
  }
}

export default Questions;
