import React, {Component} from 'react';
import './profile.css'

class Profile extends Component {

    alterProfile = (menuOption, user) => {
        let userObj = {};

        if (typeof user === "object") {
            userObj = {
                img: user.img,
                name: user.name
            }
        }

        if (menuOption === "Profile") {
            console.log("This is not implemented yet");
            return(<div>
            </div>)
        } else {
            return (<div className='component profile-container'>
                <div className="img-container"><img alt="" src={userObj.img}/></div>
                <div className="userInfo-container">
                    <div>
                        <h3>{userObj.name}</h3>
                    </div>
                    <div>
                        <p>Poäng :</p>
                    </div>
                </div>
                <div className="btn-container">
                    <button>Logout</button>
                </div>
            </div>)
        }
    }

    render() {

        return (this.alterProfile(this.props.alterProfile, this.props.userinfo));
    }
}

export default Profile;
