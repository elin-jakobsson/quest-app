import React, { Component } from 'react';
import './questions.css';
import SingleQuest from './singlequest';
import Timer from '../timer/timer'


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




 <Timer startValue={10} timeBool={false} timesUp={this.timesUp} />

  lägg till current user
*/


class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGame:false,
      qurrentQuestion: 0,
      changequest : false
    }
  }

// den orginella spelistan, existerande gamelista, categori, användar ID
/*
  let gamesArray = []
  for(let game in gameList){
    if(game.userid === user.userid){
    gamesArray.push(gameList[game])
    }
  }

  let currentGame = gamesArray.filter( game => {
    game.category === item && game.completed === false
  })

 */
isGameActive = (questList, gameList, item, user)=>{
  console.log(questList);
  console.log(gameList);
  console.log(item);
  console.log(user);

  let gamesArray = [];
  for(let game in gameList){
    if(gameList[game].userid === user){
    gamesArray.push(gameList[game]);
    // console.log('in game ', gameList[game]);
    }
  }
  console.log(gamesArray);

  // item css
  let userGameList = gamesArray.filter( game => game.category === item )

  let currentGame = gamesArray.filter( game => function(){
    console.log(game);
    if (game.category === item && game.completed === false){
      return game;
    }

  });

  console.log(userGameList);


  // let gamesArray = [];
  // for(let obj in gameList){
  //   if (gameList[obj].category === item) {
  //     console.log('kategori ',gameList[obj].category);
  //     if (gameList[obj].userid === user) {
  //       console.log('user ', gameList[obj].userid);
  //         if (gameList[obj].completed === true) { // change to false later
  //           gamesArray.push(gameList[obj]);
  //           console.log('inside game ', gameList[obj]);
  //         }
  //       }
  //     }
  //   }
  //   if (gamesArray.length > 0) {
  //
  //     return gamesArray;
  //   }else {
  //     let newgame = this.fetchCategori(questList,item);
  //     console.log(gamesArray);
  //     console.log(newgame);
  //     return newgame;
  //   }
} // isGameActive

liftActiveGame = (object)=>{
  // vad behöver de andra komponenterna veta

}

updateQuestion = ()=>{
  this.setState({qurrentQuestion: this.state.qurrentQuestion +1});
}

fetchCategori = (questList,item)=>{
  let array = [];

  for(let obj in questList){
  //  console.log(questList[obj]);
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


timesUp = (timerFinished) => {
   if (timerFinished) {
       this.setState({changequest : true}, () => {
         console.log("Changequest status : " + this.state.changequest);
       })
   }
}

  render() {

    let displayElement;

    if (this.props.firebaseIsLoaded) {
      let allQuests = {...this.props.allQuests};
      let allGames = {...this.props.allGames};
      let item = 'css';
      let userId = 'elinkey';

      console.log('allQuests ',allQuests);
      console.log('allGames ', allGames);
      let questionArray = this.isGameActive(allQuests,allGames,item, userId);

      displayElement = (
        <div>
          <Timer startValue={10} timeBool={false} timesUp={this.timesUp} />

          <SingleQuest activeGame={this.state.activeGame} updateQuestion={this.updateQuestion} questionArray={questionArray} qurrentQuestion={this.state.qurrentQuestion}/>

        </div>
      );
    }else {
      displayElement = (<p>No question data</p>);
    }

    return (<div>
              {displayElement}
            </div>);
  }
}

export default Questions;
