import React, { Component } from 'react';
import './App.css';

import Profile from './components/profile/profile'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Profile/>
        <Profile/>
        
      </div>
    );
  }
}

export default App;
