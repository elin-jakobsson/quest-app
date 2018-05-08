import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import Profile from './components/profile/profile'
import Questions from './components/questions/questions'


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

firebase.database().ref().once('value').then(snap=>{
  let data = snap.val();
  console.log(data);
})
/*
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
  }
  componentDidMount(){
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
  render() {
    return (
      <div className="App">
        <Profile/>
        <Questions questionArray={questionArray}/>
      </div>
    );
  }
}

export default App;
