import React from 'react';
import './statistic-view.css';


class StatisticView extends React.Component{

  sortView = (scoreOfPlayers) => {
    let category;
    if(this.props.list==="css"){
      category = "cssTotal"
    } else if (this.props.list==="html") {
      category = "htmlTotal"
    }else if (this.props.list === "javascript") {
      category = "javascriptTotal"
    }else{
      category = "totalScore"
    }


    if(this.props.typeOfSort === "Resultat Topp-Bott"){
      scoreOfPlayers.sort((a,b)=>{
        return b[category] - a[category];
      })

    } else {
      scoreOfPlayers.sort((a,b)=>{
        return a[category] - b[category];
      })
    }


    let showInfo = scoreOfPlayers.map( (item,index) =>{
      return (
        <li key={item.user.uid}>
          <div> {index+1} </div>
          <div> {item.user.name}</div> <div> Score:{item[category]} </div>
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
