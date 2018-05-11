import React from 'react';
import './statistic-view.css';

class StatisticView extends React.Component{

  render(){
    let scoreOfPlayers = [...this.props.scoreOfPlayers]
    let showInfo = scoreOfPlayers.map(item=>{
      return ( <div key={item.user.uid}> {item.user.name} {item.totalScore} </div>)
    })

    return(
      <div>{ showInfo } </div>
    )
  }
}

export default StatisticView;
