import React from 'react';
import './statistic-view.css';


class StatisticView extends React.Component{

  sortView = (scoreOfPlayers) => {
    scoreOfPlayers.sort((a,b)=>{
      return b.totalScore - a.totalScore;
    })

    let showInfo = scoreOfPlayers.map( (item,index) =>{
      return (
        <li key={item.user.uid}>
          <div> {index+1} </div>
          <div> {item.user.name}</div> <div> Score:{item.totalScore} </div>
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
