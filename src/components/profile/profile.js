import React, { Component } from 'react';
import './profile.css'

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className='profile-container'>
        <p>My profile</p>
      </div>

    );
  }
}

export default Profile;
