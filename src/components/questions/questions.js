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


  loopa igenom obejct ta bort question, id, rightanswer osv.
*/


class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGame:false,
      qurrentQuestion: 0
    }
  }

// den orginella spelistan, existerande gamelista, categori, användar ID
isGameActive = (questList, gameList, item, user)=>{

  for(let obj in gameList){
    if (gameList[obj].category === item) {
      if (gameList[obj].userid === user) {
          if (gameList[obj].completed === false) {
            return gameList[obj];
          }else {
            this.fetchCategori(questList,item)
          }
      }else {
        this.fetchCategori(questList,item)
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

fetchCategori = (questList,item)=>{
  let array = [];

  for(let obj in questList){
    //console.log(questList[obj]);
    if (questList[obj].category === item) {
      array.push(questList[obj]);
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
    //console.log(questionArray);

    return (
      <div>
        <SingleQuest activeGame={this.state.activeGame} updateQuestion={this.updateQuestion} questionArray={questionArray} qurrentQuestion={this.state.qurrentQuestion}/>
      </div>
    );
  }
}

export default Questions;
