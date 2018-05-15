import React, {Component} from 'react';
import "./login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wantToUpdate: true,
            loggedOrNot: false
        }
    }

    componentDidUpdate() {
        if (this.props.firebaseReady) {
            if (this.state.wantToUpdate) {
                this.observUser(this.props.users);
                this.setState({wantToUpdate: false})
            }
        }

    }
    checkUserOnDb = (users, authid, img, name) => {
        let db = this.props.db;
        let userExist = false;
        let currentUser = {};
        let newUser = {};
        let userId = "";
        let userName = "";
        // let User = {};
        let newPostKey = db.ref('users/').child('posts').push().key;
        if (authid !== undefined) {

            for (let user in users) {
                if (users[user].authid === authid) {
                    userId = user;
                    userName = users[user].name;
                    userExist = true;
                }
            }
            if (!userExist) {
                newUser = {
                    name,
                    img,
                    uid: newPostKey,
                    authid
                }
                db.ref(`users/${newPostKey}`).set(newUser);
            }
        }
        if (userId !== undefined && authid !== undefined) {
            currentUser = {
                name: userName,
                img,
                uid: userId,
                authid: authid
            }
            return currentUser;
        }

    }
    observUser = (users) => {
        this.props.firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                this.setState({loggedOrNot: true});
                // User is signed in.
                let displayName = user.displayName;
                //let email = user.email;
                let photoURL = user.photoURL;
                let uid = user.uid;
                if(!displayName){
                  displayName ="user";
                }
                // Checking database if user already exist
                // var emailVerified = user.emailVerified;
                // var isAnonymous = user.isAnonymous;
                // var providerData = user.providerData;
                // this.checkUserOnDb(users);
                this.props.updateUser(this.checkUserOnDb(users, uid, photoURL, displayName));
                this.props.changePage("Spel");
            } else {
                this.props.changePage("");
                this.setState({loggedOrNot: false});
                //console.log("We have NO user");
                // User is signed out.
                // ...
            }
        });
    }
    authRedirect = (authProvider) => {
        const auth = this.props.firebase.auth;

        const google = new auth.GoogleAuthProvider();
        const github = new auth.GithubAuthProvider();
        const facebook = new auth.FacebookAuthProvider();

        if (authProvider === "Google") {
            auth().signInWithRedirect(google);
        }
        if (authProvider === "Github") {
            auth().signInWithRedirect(github);
        }
        if (authProvider === "Facebook") {
            auth().signInWithRedirect(facebook);
        }
    }

    render() {
        const logos = {
            googleLogo: "img/googlelogo.png",
            githubLogo: "img/githublogo.png",
            facebookLogo: "img/facebooklogo.png"
        }

        if (!this.state.loggedOrNot) {
            return (<div className="component container-login">
                <div className="quest-logoContainer">
                    <img alt="Logo" src="img/logo-quest.png"></img>
                </div>
                <div className="loginSection">
                    <h2>Logga in
                    </h2>
                    <div className="greyBorder"></div>
                    <button onClick={() => this.authRedirect("Google")}>
                        <div className="logoContainer"><img alt="" src={logos.googleLogo}/>
                        </div>
                        <div className="btnTextContainer">
                            <span>Google</span>
                        </div>
                    </button>

                    <button onClick={() => this.authRedirect("Github")}>
                        <div className="logoContainer"><img alt="" src={logos.githubLogo}/></div>
                        <div className="btnTextContainer">
                            <span>Github</span>
                        </div>
                    </button>
                    <button onClick={() => this.authRedirect("Facebook")}>
                        <div className="logoContainer"><img alt="" src={logos.facebookLogo}/></div>
                        <div className="btnTextContainer">
                            <span>Facebook</span>
                        </div>
                    </button>
                </div>
            </div>);
        } else {

            return "";
        }
    }
}
export default Login;
