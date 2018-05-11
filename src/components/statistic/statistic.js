import React from 'react';
import './statistic.css';
import StatisticView from '../statistic-view/statistic-view.js'


class Statistic extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedStatistic : "hihgestScore",
      scoreOfPlayers : "",
      isLoading: true,
      wantToUpdate : true
    }
  }

  componentDidUpdate(){
    if(this.props.firebaseReady){ // om firebase är redo
      if(this.state.wantToUpdate){ // om vi vill updatera komponenten.
        let scoreOfPlayers = this.getHihgestScore();
        this.props.updateScoreOfPlayers(scoreOfPlayers); // skickar upp det
        this.setState({wantToUpdate: false, scoreOfPlayers})
      }
    }

    if(!this.props.firebaseReady && this.state.wantToUpdate === false){  // firebase har satts false.. nu vill vi uppdatera komponenten igen.
      this.setState({wantToUpdate: true})
    }
  }

  handleClick = (item) => {
    console.log("hejsan", item);
    this.getHihgestScore();
    this.setState({selectedStatistic : item })

  }

  populateMenu = () => {
    let list = ["HihgestScore", "HighestScoreByCategory"];
    let newLiList = list.map( item => {
      return (
        <li onClick={ () => this.handleClick(item) } key={ item }> { item } </li>
      )
    })
    return (<ul> { newLiList } </ul>)
  }


  calculateScores = (arrayGames, user) => {
    let newUserStat = {
      cssTotal : 0,
      cssHigh: 0,
      htmlTotal: 0,
      htmlHigh: 0,
      javascriptTotal: 0,
      javascriptHigh: 0,
      totalScore : 0,
      user: user
    }

    let calc = (category, score) =>{
      newUserStat[category+"Total"] += score
      if(newUserStat[category+"High"] < score ){
        newUserStat[category+"High"] = score;
      }
      newUserStat.totalScore += score
    }

    arrayGames.forEach(item => {
      calc(item.catagory,item.score);
    })

    return newUserStat;
  }

  getHihgestScore = () => {
    // Går igenom alla användare och plockar ut alla spel den gjort. Pushar resultatet till en lista som vi sedan skickar upp till app för att använda i profil och statestik

    let gamesObj = {...this.props.games};
    let gamesArray = [];

    for(let item in gamesObj){  // gör om objetet till en lista
      let newObj = gamesObj[item]
      gamesArray.push(newObj)
    }

    let users = {...this.props.users}

    let scoreOfPlayers = []; // lista med alla spelares resultat
    for(let user in users){
      user = users[user]
      let userGameList = gamesArray.filter( item => item.userid === user.uid) // filtererar alla games för användaren
      let result = this.calculateScores(userGameList, user);
      scoreOfPlayers.push(result);
    }

    return scoreOfPlayers;

  }



  render(){

    let menu = this.populateMenu();

    let data;
    if(this.state.selectedStatistic === "HihgestScore"){
      data = "hihgscore"
    }else {
      data = "not hihgestScore"
    }

    let showStat = ""
    if(this.state.scoreOfPlayers){
      showStat = <StatisticView scoreOfPlayers={ this.state.scoreOfPlayers } />
    } else {
      showStat = "Statestic saknas"
    }
    return(
      <div className="component container-statistic">
        Här är statistica
        { menu }
        { data }
        { showStat }
      </div>

    );
  }
}

export default Statistic;
