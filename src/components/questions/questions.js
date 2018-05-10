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



  ska vi ha en kategori i firebase för activa games och en för avslutade???

  har vi en kategori för activa games kan jag bara kolla finns det ett game med användarens id som är activt
  och hämta den spellistan som sparats där.

  och de som vill kollla högsta poängen på allaför high scores, kan göra det
  kan man inte kolla i användrens information om vem som har högsta poäng.
*/


class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGame:false,
      qurrentQuestion: 0
    }
  }

isGameActive = (objectList, item, user)=>{
  for(let obj in objectList){
    if (objectList[obj].category === item) {
      if (objectList[obj].userid === user) {

      }
    }
  }
}

liftActiveGame = (object)=>{
  // vad behöver de andra komponenterna veta

}

updateQuestion = ()=>{
  this.setState({qurrentQuestion: this.state.qurrentQuestion +1});
}

fetchCategori = (objectList,item)=>{
  let array = [];

  for(let obj in objectList){
    console.log(objectList[obj]);
    if (objectList[obj].category === item) {
      array.push(objectList[obj]);
    }
  }

  array = this.shuffleArray(array);
  return array
} // fetchCategori


shuffleArray=(array)=>{
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
   randomIndex = Math.floor(Math.random() * currentIndex);
   currentIndex -= 1;

   temporaryValue = array[currentIndex];
   array[currentIndex] = array[randomIndex];
   array[randomIndex] = temporaryValue;
 }

  array = array.slice(0,10);
  return array;
} // Shuffle()

  render() {

  let questionArray = this.fetchCategori(this.props.allQuests,'css');
    console.log(questionArray);

    return (
      <div>
        <SingleQuest updateQuestion={this.updateQuestion} questionArray={questionArray} qurrentQuestion={this.state.qurrentQuestion}/>
      </div>
    );
  }
}

export default Questions;
