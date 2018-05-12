import React, { Component } from 'react';
import './questions.css';
import SingleQuest from './singlequest';
import Timer from '../timer/timer'

/* push ett till firebase med rätt info
  */

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGame: '',
      allQuest: '',
      qurrentQuestion: 0,
      timeIsOut : false
    }
  }

createNewGame = (allQuest, item, userId)=> {
  let newPostKey = this.props.db.ref('games/').child('posts').push().key;
  // console.log(allQuest);
  // console.log(item);
  // console.log(userId);
  let gameObj = {
    questList:{
      0: {
        answer: 'x',
        questKey: allQuest[0].id
      },
      1: {
        answer: 'x',
        questKey: allQuest[1].id
      },
      2: {
        answer: 'x',
        questKey: allQuest[2].id
      },
      3: {
        answer: 'x',
        questKey: allQuest[3].id
      },
      4: {
        answer: 'x',
        questKey: allQuest[4].id
      },
      5: {
        answer: 'x',
        questKey: allQuest[5].id
      },
      6: {
        answer: 'x',
        questKey: allQuest[6].id
      },
      7: {
        answer: 'x',
        questKey: allQuest[7].id
      },
      8: {
        answer: 'x',
        questKey: allQuest[8].id
      },
      9: {
        answer: 'x',
        questKey: allQuest[9].id
      }
    },
    category :item,
    gameid : newPostKey,
    completed:false,
    score: 0,
    userid: userId
  }

  this.props.db.ref(`games/${newPostKey}`).set(gameObj);
  console.log('new game',gameObj);
  return gameObj;
} // createNewGame


isGameActive = (questList, gameList, item, user)=>{
  let gamesArray = [];
  for(let game in gameList){
    if(gameList[game].userid === user){
    gamesArray.push(gameList[game]);
    }
  }

  let currentGame = gamesArray.filter( game => game.category === item && game.completed === false)

  console.log('current',currentGame.length);

  if (currentGame.length > 0) {
     console.log(currentGame);
     return currentGame[0];
  }else {
    let newQuestList = this.fetchCategori(questList,item);
    let newgame = this.createNewGame(newQuestList, item, user)
    return newgame;
  }
} // isGameActive

updateQuestion = (rightAnswer)=>{
  console.log("Funkar!!");
  let game = this.state.currentGame;
  let gameid = game.gameid;
<<<<<<< HEAD
  let questList = game.questList;
  let questNo = 0;
  while(questList[questNo].answer !== "x"){  //letar rätt på första frågan som inte besvarats
    questNo++
    if(questNo > 9){ break; }
  }

  let evaluateAnswer;
  ((rightAnswer=== true) ? evaluateAnswer = 1 : evaluateAnswer = 0);
  console.log(evaluateAnswer);

  this.props.db.ref(`games/${gameid}/questList/${questNo}/answer`).set(evaluateAnswer); //uppdaterar databasen
=======
  let no;
>>>>>>> 3827cc4c61e8ec9599672ff3b58b817cdac67f7f

    //let keyOfObj = Object.keys(game.questList).find( key => game.questList[key] === gameid);
  let keyOfObj = Object.keys(game.questList).find( key => key );
  console.log("vart i listan skall väredet sättas: ",keyOfObj);

  let evaluateAnswer;
  ((rightAnswer=== true) ? evaluateAnswer = 1 : evaluateAnswer = 0);
  //db.ref(`games/${gameid}/questList/${no}/answer`).set(evaluateAnswer)
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
       this.setState({timeIsOut : true}, () => {
         console.log("Changequest status : " + this.state.timeIsOut);
       })
   }
}

componentDidMount(){
  let allQuests = {...this.props.allQuests};
  let allGames = {...this.props.allGames};

  let item = 'css';
  let userId = 'elinkey';
  let gameObj = this.isGameActive(allQuests,allGames,item, userId); // ett spel retuneras och väljs ut. Om det inte finns ett pågående skapas ett nytt inuti funktionen.

  this.setState({currentGame: gameObj})
  this.props.db.ref(`games/${gameObj.gameid}`).on('value',this.liveUpdateGame); //startar en lyssnare i databasen på games.. som vi kan använda
}

liveUpdateGame = (snap) =>{
  let data = snap.val();
  this.setState({ liveUpdateCurrentGame : data })
  console.log("uppdatering från databseen: ", data);
}

componentWillUnmount(){
  this.props.db.ref('games/').off('value',this.liveUpdateGame);
}

handleClickDatabase = () => {
  console.log("funkar! nu kan användaren välja att byta till nästa fråga :)");


}

  render() {

    return (<div>
                <Timer startValue={10} timeBool={false} timesUp={this.timesUp} />
                { this.state.currentGame !=="" ? <SingleQuest db={this.props.db} timeIsOut={this.state.timeIsOut} updateQuestion={this.updateQuestion} allQuests={ this.props.allQuests } currentGame={this.state.currentGame} qurrentQuestion={this.state.qurrentQuestion}/> : "" }
<<<<<<< HEAD
                <button onClick={this.handleClickDatabase}>Nästa fråga!!</button>
=======
>>>>>>> 3827cc4c61e8ec9599672ff3b58b817cdac67f7f
            </div>);
  }
}

export default Questions;
