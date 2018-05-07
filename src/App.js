import React, { Component } from 'react';
import './App.css';

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
