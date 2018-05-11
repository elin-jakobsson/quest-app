import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import Profile from './components/profile/profile'
import Questions from './components/questions/questions'
import Categories from './components/categories/categories.js';
import Login from './components/login/login';
import QuestStart from './components/queststart/queststart.js';
import QuestBar from './components/questbar/questbar.js';
import Menu from './components/menu/menu.js';
import CountScore from './components/countscore/countscore.js';
import Statistic from './components/statistic/statistic.js';



// Test array från firebase
const questionArray = [{quest:'Vad står HTML för?',
                        alternativ:[
                        'Hyper Tacktic Marmelade Logic',
                        'Herrod The Magic Lunytoon',
                        'Hyper Text Markup Language'
                        ]
                      },
                      {quest:'Är HTML ett programeringsspråk?',
                      alternativ:['Ja', 'Nej'
                      ]
                      }];

var config = {
   apiKey: "AIzaSyAP1ELuVASv1aMYuXvbQk8N5B-fjIzNWP4",
   authDomain: "quest-app-lab32.firebaseapp.com",
   databaseURL: "https://quest-app-lab32.firebaseio.com",
   projectId: "quest-app-lab32",
   storageBucket: "quest-app-lab32.appspot.com",
   messagingSenderId: "85647486236"
 };
firebase.initializeApp(config);
const db = firebase.database();



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentPage: "Spel",
      selectedCategori : "",
      allGames : "",
      allQuests : "",
      allUsers: ""
    }
  }

// Get the HTML,CSS and JS question
  getQuestFromFirebase = () => {}
// Add quest in componentDidMount
  addQuestToFirebase = () => {
    let newPostKey = db.ref('quests/').child('posts').push().key;
    let quest = {
      a : "15",
      b : "50",
      c : "100",
      d : "1000",
      category : "css",
      id : newPostKey,
      question : "Vad har inline-style för specificitetsvärde i CSS?",
      rightanswer : "d"
    }
    db.ref(`quests/${newPostKey}`).set(quest);
  }

  getUserInfo = (userObj) =>{
    console.log(userObj);
  }

  componentDidMount(){
    this.getUserInfo();
    // this.addQuestToFirebase();
    // call for firebase or ajax here
    //start all calls
    // kalla på db.ref () med en färdig funktion, referera till en existerande funktion.
    this.getDataFromFirebase();
  }
  componentWillUnmount(){
    // close all calls
    // hur vat man att den stängs?
  }
  componentDidCatch(error, info){
    // fånga error
  }


  getDataFromFirebase = () => {
    db.ref('games/').once('value').then(snap=>{
      let data = snap.val();
      this.setState({ allGames : data })
    })
    db.ref('quests/').once('value').then(snap=>{
      let data = snap.val();
      this.setState({ allQuests : data })
    })
    db.ref('users/').once('value').then(snap=>{
      let data = snap.val();
      this.setState({ allUsers : data })
    })

  }

  changePage = (item) => {
    this.setState({ currentPage : item })
  }

  chooseCategori = (item) => {
    this.setState({selectedCategori : item})
  }
  render() {
    return (
      <div className="App">
        <Profile/>
        <Login firebase={firebase} updateUser={this.getUserInfo}/>
        <Questions questionArray={questionArray} />
        <Categories selectedCategori={this.chooseCategori} />
        <QuestStart />
        <QuestBar />
        <Menu changePage={this.changePage} currentPage={this.state.currentPage}/>
        <CountScore />
        <Statistic games ={ this.state.allGames } users= { this.state.allUsers }/>
      </div>
    );
  }
}

export default App;



/*
firebase.database().ref().once('value').then(snap=>{
  let data = snap.val();
  console.log(data);
})
firebase.database().ref('users/').once('value').then(snap=>{
  let data = snap.val();
  console.log(data);
})
firebase.database().ref('quests/').once('value').then(snap=>{
  let data = snap.val();
  console.log(data);
})
*/
//var newPostKey = firebase.database().ref('Games/').child('posts').push().key;   // hämtar ny nyckel
