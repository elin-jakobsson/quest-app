import React from 'react';
import './statistic.css';


class Statistic extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedStatistic : "hihgestScore",
      scoreOfPlayers : "",
      isLoading: true
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


  calculateScores = (arrayGames) => {
    let newUserStat = {
      cssTotal : 0,
      cssHigh: 0,
      htmlTotal: 0,
      htmlHigh: 0,
      javascriptTotal: 0,
      javascriptHigh: 0
    }
    let calc =  {
      "css" : ( score ) => { newUserStat.cssTotal += score; if( score > newUserStat.cssHigh) newUserStat.cssHigh = score;},
      "html" : ( score ) => { newUserStat.htmlTotal += score; if( score > newUserStat.htmlHigh) newUserStat.htmlHigh = score;},
      "javascript" : ( score ) => { newUserStat.javascriptTotal += score; if( score > newUserStat.javascriptHigh) newUserStat.javascriptHigh = score;}
    }
    arrayGames.forEach(item => {
      calc[item.catagory](item.score);
    })

    return newUserStat;
  }

  getHihgestScore = () => {
    // Går igenom alla användare och plockar ut alla spel den gjort. Pushar resultatet till en lista som vi sedan kan välja vad vi ska visa för användaren.

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
      let result = this.calculateScores(userGameList);
      scoreOfPlayers.push(result);
    }

    console.log(scoreOfPlayers);

    let newList = scoreOfPlayers.map(item => <li>{item.cssTotal}</li>)

    return newList;
    //return (<ul>{newList}</ul>);
  }

  render(){


    return(
      <div className="component container-statistic">
        data :)
      </div>

    );
  }
}

export default Statistic;
