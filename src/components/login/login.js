import React, {Component} from 'react';
import "./login.css";

class Login extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     // wantToUpdate : true
  //   }
  // }

  // componentDidUpdat(){
  //    if(this.props.firebaseReady){ // om firebase är redo
  //      if(this.state.wantToUpdate){ // om vi vill updatera komponenten.
  //        this.setState({wantToUpdate: false})
  //      }
  //    }
  //  }

    componentDidMount() {
      this.observUser(this.props.users);

    }
    checkUserOnDb = (users) =>{
      console.log(this.props.users);
      console.log(users);
      let db = this.props.db;
      for(let user in users){
        console.log(users[user]);
      }
    }
    observUser = () => {
        this.props.firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var photoURL = user.photoURL;
                var uid = user.uid;

                // var emailVerified = user.emailVerified;
                // var isAnonymous = user.isAnonymous;
                // var providerData = user.providerData;
                // this.checkUserOnDb(users);
                let userObj = {
                    img: photoURL,
                    userid: uid,
                    useremail: email,
                    name: displayName
                }

                this.props.updateUser(userObj);
            } else {
                console.log("We have NO user");
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

        return (<div className="component container-login">
            <div className="quest-logoContainer">
                <img alt="Logo" src="img/logo-quest.png"></img>
            </div>
            <div className="loginSection">
              <h2>Logga in </h2>
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
    }
}
export default Login;
