import React, { Component } from 'react';
import './questions.css';
import SingleQuest from './singlequest';
import Timer from '../timer/timer'

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGame: false,
      qurrentQuestion: 0,
      changequest : false
    }
  }

isGameActive = (questList, gameList, item, user)=>{

  let gamesArray = [];
  for(let game in gameList){
    if(gameList[game].userid === user){
    gamesArray.push(gameList[game]);
    }
  }

  let currentGame = gamesArray.filter( game => game.category === item && game.completed === false)

  console.log(currentGame.length);

  if (currentGame.length) {
     this.setState({activeGame:true});
     return currentGame
  }else {
    this.setState({activeGame:false});
    let newgame = this.fetchCategori(questList,item);
    return newgame;
  }

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
