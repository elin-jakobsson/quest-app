import React, { Component } from 'react';
import './questions.css';
import SingleQuest from './singlequest';
import Timer from '../timer/timer'
import CountScore from '../countscore/countscore.js';
import QuestBar from '../questbar/questbar.js';
/* push ett till firebase med rätt info
  */

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGame: '',
      allQuest: '',
      timeIsOut : false,
      liveUpdateCurrentGame: "",
      resultMessage: '',
      listOfAnswer: []
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
  let questList = game.questList;
  let questNo = 0;
  while(questList[questNo].answer !== "x"){  //letar rätt på första frågan som inte besvarats
    questNo++
    if(questNo > 9){ break; }
  }

  let rightMessages = ['Grattis, det var RÄTT', 'Supper bra', 'Hackerman :)', 'Awesome Gitman', '!false :)', 'Master of everything', 'The queen/king of code', 'TRUE', 'Great!!', 'You are awesome']
  let wrongMessages = ['Tyvärr fel','Du behöver plugga :)', "Inte en chans", "Sover du?","Kom igen nu bättre kan du!","Fel","Noo","Wrong","Bigg fail","Vad ska David (lärare) säga nu?","Nope","!true :(","Bigg noo","Whaaat!!?","FALSE","nääää!!","Bra försök"]

  let posRight = Math.floor(Math.random() * rightMessages.length);
  let posWrong = Math.floor(Math.random() * wrongMessages.length);

  let evaluateAnswer;
  let msg;
  if (rightAnswer) {
    evaluateAnswer = 1
    msg = rightMessages[posRight];
  }else {
    evaluateAnswer = 0
    msg = wrongMessages[posWrong];
  }

  console.log(evaluateAnswer);


  // räkna ut aktuell poäng för användaren
  let listOfAnswer = this.countPlayerScore(evaluateAnswer);
  console.log(listOfAnswer);
  //

  this.setState({
    resultMessage: msg,
    timeIsOut: true,
    listOfAnswer
  });

  this.props.db.ref(`games/${gameid}/questList/${questNo}/answer`).set(evaluateAnswer); //uppdaterar databasen
}

countPlayerScore = (evaluateAnswer) => {
  let bonus = 2;
  let bonusLevel = 2;
  let rightAnswer = 1;
  let wrongAnswer = 0;

  let firstX = true;
  if(evaluateAnswer === undefined){ // om vi inte skickar in något värde till räknaren så vill vi inte lägga in användarens svar i listan listOfAnswer.
    firstX = false
  }
  let countRightAnswerInRow = 0;
  let listOfAnswer = this.state.currentGame.questList.map( item => {
    let answer;
    if(item.answer ==="x" && firstX){
      answer = evaluateAnswer;
      firstX = false;
    }else {
      answer = item.answer;
    }

    if(answer === rightAnswer){
      countRightAnswerInRow++
    }else{
      countRightAnswerInRow = 0;
    }

    if(countRightAnswerInRow > bonusLevel ) {
      return bonus;  // retunerar 2
    } else if (!countRightAnswerInRow) {
      return answer; // retunerar x alterinativt 0
    } else {
      return rightAnswer; // retunerar 1
    }
  });
  return listOfAnswer
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

  this.setState({ currentGame: gameObj }, () => { // sätter nuvarnade game och därefter sätts nuvarnade score
    let listOfAnswer = this.countPlayerScore();
    this.setState({listOfAnswer})
  })

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

changeQuest = () => {
  // uppdatear state current game med ny live data
  // starta även timern
  let gameObj = this.state.liveUpdateCurrentGame;
  this.setState({
    currentGame: gameObj,
    timeIsOut : false
  })

}

  render() {

    return (<div>
                <CountScore listOfAnswer= { this.state.listOfAnswer } />
                { !this.state.timeIsOut ? <Timer startValue={10} timeBool={false} timesUp={this.timesUp} /> : <p>{this.state.resultMessage}</p>}
                { this.state.currentGame !=="" ? <SingleQuest db={this.props.db} changeQuest={this.changeQuest} timeIsOut={this.state.timeIsOut} updateQuestion={this.updateQuestion} allQuests={ this.props.allQuests } currentGame={this.state.currentGame} /> : "" }
                <QuestBar listOfAnswer = { this.state.listOfAnswer }/>
            </div>);
  }
}

export default Questions;
