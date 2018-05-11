import React from 'react';
import './statistic-view.css';


class StatisticView extends React.Component{

  sortView = (scoreOfPlayers) => {
    console.log(scoreOfPlayers);
    scoreOfPlayers.sort((a,b)=>{
      return a.totalScore - b.totalScore;
    })

    let showInfo = scoreOfPlayers.map( (item,index) =>{
      return (
        <li key={item.user.uid}>
          <div> Place: {index+1} </div>
          <div> Name:{item.user.name} TotalScore:{item.totalScore} </div>
        </li>
      )
    })
    return (<ul> { showInfo } </ul>)
  }



  render(){
    let scoreOfPlayers = [...this.props.scoreOfPlayers]
    let showInfo = this.sortView(scoreOfPlayers);

    return(
      <div className="component container-statisticView">
        { showInfo }
      </div>
    )
  }
}

export default StatisticView;
