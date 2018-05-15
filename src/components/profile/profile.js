import React, {Component} from 'react';
import './profile.css'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isEditable: false,
            inputData: this.props.user.name
        }
    }
    componentDidUpdate() {
        if (this.state.isLoading) {
            if (typeof this.props.allGames === "object" && typeof this.props.allUsers === "object") {
                this.calculateScores(this.props.allGames, this.props.allUsers);
                this.setState({isLoading: false})

            }
        }
    }
    calculateScores = (arrayGames, user) => {
        let listOfGames = [];
        for (let game in arrayGames) {
            if (arrayGames[game].uid === user.uid) {
                listOfGames.push(arrayGames[game]);
            }
        }

        let newUserStat = {
            cssTotal: 0,
            cssHigh: 0,
            htmlTotal: 0,
            htmlHigh: 0,
            javascriptTotal: 0,
            javascriptHigh: 0,
            totalScore: 0,
            user: user
        }

        let calc = (category, score) => {
            newUserStat[category + "Total"] += score
            if (newUserStat[category + "High"] < score) {
                newUserStat[category + "High"] = score;
            }
            newUserStat.totalScore += score
        }

        listOfGames.forEach(item => {
            calc(item.category, item.score);
        })
        return newUserStat;
    }

    editInfo = () => {
        if (this.state.isEditable === false)
            this.setState({isEditable: true})
        else
            this.setState({isEditable: false})
    }

    handleChange = (e) => {
        this.setState({inputData: e.target.value})
    }

    compareInputWithDb = (newName, name, uid) => {

        if (this.state.inputData !== "" || this.state.inputData === name) {
            let db = this.props.db;
            db.ref(`users/${uid}/name`).set(newName);
        }
    }

    handleClickLogout = event => {
        let firebase = this.props.firebase;
        firebase.auth().signOut().then(() => {
            this.props.setCurrentUser("");
            console.log("User logged out");
            // Sign-out successful.
        }).catch(function(error) {
            console.log("Logged out failed");
            // An error happened.
        });
    }

    alterProfile = (menuOption, currentUser, gameValues, listOfUsers, inGame) => {
        let userObj = {};

        if (typeof currentUser === "object" && typeof listOfUsers === "object") {
            for (let user in listOfUsers) {
                if (listOfUsers[user].authid === currentUser.authid) {

                    let img = listOfUsers[user].img;
                    let name = listOfUsers[user].name;
                    let uid = listOfUsers[user].uid

                    userObj = {
                        img,
                        name,
                        uid
                    }
                }
            }
        }
        let editconditions = () => {
            let SaveAndEdit;
            if (this.state.isEditable) {
                SaveAndEdit = "Save";
                return (<div className="profile-header">
                    <div className="editUserInfo">
                        <p onClick={this.editInfo}>{SaveAndEdit}</p>
                        <div><img onClick={this.editInfo} alt="" src="img/edit-icon.png"/></div>
                    </div>
                    <div className="profilePage-imgcontainer">
                        <img alt="" src={userObj.img}/></div>
                    <div>
                        <label>
                            <input onChange={(e) => this.handleChange(e)} value={this.state.inputData}></input>
                        </label>
                    </div>
                </div>)
            } else {
                if (!this.state.isEditable) {
                    SaveAndEdit = "Edit";
                    this.compareInputWithDb(this.state.inputData, userObj.name, userObj.uid)
                }
                return (<div className="profile-header">
                    <div className="editUserInfo">
                        <p onClick={this.editInfo}>Edit</p>
                        <div><img onClick={this.editInfo} alt="" src="img/edit-icon.png"/></div>
                    </div>
                    <div className="profilePage-imgcontainer">
                        <img alt="" src={userObj.img}/></div>
                    <div>
                        <p className="p-style">{this.state.inputData}</p>
                    </div>
                </div>)
            }
        }

        if (menuOption === "Profile") {
            let colors = {
                htmlColor: "#60AB25",
                jsColor: "#F7BF35",
                scoreColor: "white"
            }

            return (<div className="component profilePage-container">
                {editconditions()}
                <div className="highestScoreSection">
                    <div className="higestScoreContent">
                        <h3>Högsta spel poäng</h3>
                        <p>{gameValues.totalScore}</p>
                        <div className="greyLine"></div>
                    </div>
                </div>
                <div className="categoryScoreSection">
                    <div className="catSection">
                        <div className="catSectionContent">
                            <p>CSS</p>
                            <div>
                                <p style={{
                                        color: colors.scoreColor
                                    }}>{gameValues.cssTotal}</p>
                                <p>Poäng</p>
                            </div>
                        </div>
                    </div>
                    <div className="catSection">
                        <div className="catSectionContent">
                            <p style={{
                                    color: colors.htmlColor
                                }}>HTML</p>
                            <div>
                                <p style={{
                                        color: colors.scoreColor
                                    }}>{gameValues.htmlTotal}</p>
                                <p>Poäng</p>
                            </div>
                        </div>
                    </div>
                    <div className="catSection">
                        <div className="catSectionContent">
                            <p style={{
                                    color: colors.jsColor
                                }}>JS</p>
                            <div>
                                <p style={{
                                        color: colors.scoreColor
                                    }}>{gameValues.javascriptTotal}</p>
                                <p>Poäng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        }
        if (!inGame && inGame !== undefined) {
            return (<div className='component profile-container'>
                <div className="img-Section">
                    <div className="img-container"><img alt="" src={userObj.img}/></div>
                </div>
                <div className="userInfo-container">
                    <div>
                        <h3>{this.state.inputData}</h3>
                    </div>
                    <div>
                        <p>Score : {gameValues.totalScore}</p>
                    </div>
                </div>
                <div className="btn-container">
                    <button className="logOutBtn" onClick={this.handleClickLogout}>Logout</button>
                </div>
            </div>)
        } else {
            return (<div></div>)
        }
    }

    render() {
        return (this.alterProfile(this.props.currentPage, this.props.user, this.calculateScores(this.props.allGames, this.props.user), this.props.allUsers, this.props.playerReady));
    }
}

export default Profile;
