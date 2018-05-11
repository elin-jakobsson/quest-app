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
            let colors = {
                htmlColor: "#60AB25",
                jsColor: "#F7BF35",
                scoreColor:"white"
            }

            return (<div className="component profilePage-container">
                <div className="profile-header">
                    <div className="profilePage-imgcontainer">
                        <img alt="" src={userObj.img}/></div>
                    <div>
                        <p>{userObj.name}</p>
                    </div>
                </div>
                <div className="highestScoreSection">
                    <div className="higestScoreContent">
                        <h3>Högsta spel poäng</h3>
                        <p>120</p>
                        <div className="greyLine"></div>
                    </div>
                </div>
                <div className="categoryScoreSection">
                    <div className="catSection">
                        <div className="catSectionContent">
                            <p>CSS</p> <div><p style={{color:colors.scoreColor}}>120</p><p>Poäng</p></div>
                        </div>
                    </div>
                    <div className="catSection">
                        <div className="catSectionContent">
                            <p style={{
                                    color: colors.htmlColor
                                }}>HTML</p><div><p style={{color:colors.scoreColor}}>100</p><p>Poäng</p></div>
                        </div>
                    </div>
                    <div className="catSection">
                        <div className="catSectionContent">
                            <p style={{
                                    color: colors.jsColor
                                }}>JS</p><div><p style={{color:colors.scoreColor}}>90</p><p>Poäng</p></div>
                        </div>
                    </div>
                </div>
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
