import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import Profile from './components/profile/profile'
import Questions from './components/questions/questions'
import Categories from './components/categories/categories.js';
import Login from './components/login/login';
import Menu from './components/menu/menu.js';
import Statistic from './components/statistic/statistic.js';
import QuestStart from './components/queststart/queststart.js';

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
      currentPage: "",
      currentUser : "",
      selectedCategori : "",
      allGames : "",
      allQuests : "",
      allUsers: "",
      firebaseIsLoaded: false,
      isPlayerReady : false
    }
  }

// Get the HTML,CSS and JS question
  getQuestFromFirebase = () => {}
// Add quest in componentDidMount
  addQuestToFirebase = () => {
    let newPostKey = db.ref('quests/').child('posts').push().key;
    let quest = {
      a : 'function myFunction()',
      b : 'function:myFunction()',
      c : 'function = myFunction()',
      category : "js",
      id : newPostKey,
      question : "Hur skapar vi en funktion i javascript?",
      rightanswer : "a"
    }
    db.ref(`quests/${newPostKey}`).set(quest);
  }

  getUserInfo = (userObj) =>{
    if(typeof userObj === "object"){
      this.setState({currentUser : userObj})
    }
  }

  componentDidMount(){
    this.getUserInfo();
    //this.addQuestToFirebase();
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


  getDataFromFirebase = () => {  // med ett promise som ändrar status på firebaseIsLoaded när all data är hämtad från firebase

    let promiseOne = new Promise((resolve, reject)=>{

      db.ref(`games/`).on('value', (snap)=>{ // live uppdatering
        let data = snap.val();
        this.setState({ allGames : data })
        resolve();
      });
    })

    let promiseTwo = new Promise((resolve, reject)=>{
      db.ref('quests/').once('value').then(snap=>{
        let data = snap.val();
        this.setState({ allQuests : data })
        resolve();
      })
    })

    let promiseThree = new Promise((resolve, reject)=>{
      // db.ref('users/').once('value').then(snap=>{
      //   let data = snap.val();
      //   this.setState({ allUsers : data })
      //   resolve();
      // })
      db.ref(`users/`).on('value', (snap)=>{ // live uppdatering
        let data = snap.val();
        this.setState({ allUsers : data })
        resolve();
      });
    })


    Promise.all([promiseOne,promiseTwo,promiseThree]).then( values =>{
      this.setState({firebaseIsLoaded: true})
      //console.log("firebase is loaded!! :)");
    })
  }

  changePage = (item) => {
    this.setState({ currentPage : item })
  }

  chooseCategori = (item) => {
    this.setState({selectedCategori : item})
  }

  updatePlayerReady = (isReady) => {
    this.setState( { isPlayerReady: isReady })
  }
  updateCurrentUser = (status) =>{
    this.setState({currentUser : status})
  }

  render() {

    let showComponents;
    switch(this.state.currentPage) {
      case "Spel" :
        if ( this.state.selectedCategori === "" ) {
          showComponents = ( <Categories selectedCategori = { this.chooseCategori}  />)
        } else {
          if( !this.state.isPlayerReady ){
            showComponents = ( <QuestStart chooseCategori={ this.chooseCategori } selectedCategori = { this.state.selectedCategori } updatePlayerReady={ this.updatePlayerReady }/> )
          } else {
            showComponents = (
              <Questions
                db={db}
                selectedCategori={this.state.selectedCategori}
                firebaseIsLoaded={this.state.firebaseIsLoaded}
                allGames={this.state.allGames}
                allQuests={this.state.allQuests}
                currentUser={ this.state.currentUser }
                chooseCategori = { this.chooseCategori }
              />
            )
          }
        }
        break;

      case "HighScore" :
        showComponents = (
          <Statistic
            games ={ this.state.allGames }
            users= { this.state.allUsers }
            firebaseReady = { this.state.firebaseIsLoaded }
          />
        )
        break;

      case "Profile" :
        showComponents = ""
        break;
      default :
        showComponents = ""


    }

    return (
      <div className="App">
        {this.state.currentUser && this.state.allGames ? <Profile  currentPage = {this.state.currentPage}
          allGames={this.state.allGames} allUsers={this.state.allUsers} user={this.state.currentUser} firebase={firebase} db={db}
          playerReady = {this.state.isPlayerReady} setCurrentUser = {this.updateCurrentUser}/> : "" }

        { showComponents }

        <Login changePage={this.changePage} firebase={firebase} updateUser={this.getUserInfo} firebaseReady = { this.state.firebaseIsLoaded }
           users = { this.state.allUsers  } db  = {db}/>
         {this.state.currentUser ? <Menu
          changePage={this.changePage}
          currentPage={this.state.currentPage}
          updatePlayerReady={ this.updatePlayerReady }
        /> : ""}
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
