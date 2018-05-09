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

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentPage: "Spel"
    }
  }
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
  }
  componentWillUnmount(){
    // close all calls
    // hur vat man att den stängs?
  }
  componentDidCatch(error, info){
    // fånga error
  }

  changePage = (item) => {
    this.setState({ currentPage : item })
  }
  render() {
    return (
      <div className="App">
        <Profile/>
        <Login firebase={firebase} updateUser={this.getUserInfo}/>
        <Questions questionArray={questionArray} />
        <Categories />
        <QuestStart />
        <QuestBar />
        <Menu changePage={this.changePage} currentPage={this.state.currentPage}/>
      </div>
    );
  }
}

export default App;
