import React from 'react';
import './statistic.css';
import StatisticView from '../statistic-view/statistic-view.js'


class Statistic extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedStatistic : "Resultat Topp-Bott",
      scoreOfPlayers : "",
      isLoading: true,
      wantToUpdate : true
    }
  }

  componentDidMount(){
      console.log("funkar");
    if(this.props.firebaseReady){ // om firebase är redo

      if(this.state.wantToUpdate){ // om vi vill updatera komponenten.
        let scoreOfPlayers = this.getHihgestScore();
        this.setState({wantToUpdate: false, scoreOfPlayers})
      }
    }
  }

  handleClick = (item) => {
    this.getHihgestScore(); // uppdaterar statestik
    this.setState({selectedStatistic : item }) // ändrar vilken typ av statestik som ska visas.

  }

  populateMenu = () => {
    let list = ["Resultat Topp-Bott", "Resultat Bott-Topp"];
    let newLiList = list.map( item => {
      return (
        <li className={this.state.selectedStatistic === item ? "selected" : "" } onClick={ () => this.handleClick(item) } key={ item }> { item } </li>
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
      calc(item.category,item.score);
    })

    return newUserStat;
  }

  getHihgestScore = () => {
    // Går igenom alla användare och plockar ut alla spel den gjort.
    // Pushar resultatet till en lista som vi sedan skickar upp till app för att använda i profil och statestik
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
      let userGameList = gamesArray.filter( item => item.uid === user.uid) // filtererar alla games för användaren
      let result = this.calculateScores(userGameList, user);
      scoreOfPlayers.push(result);
    }

    return scoreOfPlayers;
  }

  render(){
    let menu = this.populateMenu();

    return(
      <div className="component container-statistic">
        { menu }
        <h3>TOTAL</h3>
        {(this.state.scoreOfPlayers) ?  (<StatisticView scoreOfPlayers={ this.state.scoreOfPlayers } typeOfSort = { this.state.selectedStatistic } list = "total"      />) : "Loading!!"  }
        <h3>CSS</h3>
        {(this.state.scoreOfPlayers) ?  (<StatisticView scoreOfPlayers={ this.state.scoreOfPlayers } typeOfSort = { this.state.selectedStatistic } list = "css"        />) : "Loading!!"  }
        <h3>JAVASCRIPT</h3>
        {(this.state.scoreOfPlayers) ?  (<StatisticView scoreOfPlayers={ this.state.scoreOfPlayers } typeOfSort = { this.state.selectedStatistic } list = "javascript" />) : "Loading!!"  }
        <h3>HTML</h3>
        {(this.state.scoreOfPlayers) ?  (<StatisticView scoreOfPlayers={ this.state.scoreOfPlayers } typeOfSort = { this.state.selectedStatistic } list = "html"       />) : "Loading!!"  }
      </div>
    );
  }
}

export default Statistic;
