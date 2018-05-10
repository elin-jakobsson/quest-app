import React from 'react';
import './statistic.css';


class Statistic extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedStatistic : "hihgestScore"
    }
  }

  handleClick = (item) => {
    console.log("hejsan", item);
    this.setState({selectedStatistic : item })
    if(item === "HihgestScore"){
      this.getHihgestScore()
      }
  }

  populateMenu = () => {
    let list = ["HihgestScore", "HighestScoreByCategory"];
    let newLiList = list.map( item => {
      return (
        <li onClick={ () => this.handleClick(item) }> { item } </li>
      )
    })
    return (<ul> { newLiList } </ul>)
  }

  getHihgestScore = () => {
    console.log(this.props.games)
    return "hihgestScore"
  }

  render(){
    let menu = this.populateMenu();
    let data;
    if(this.state.selectedStatistic === "HihgestScore"){
      data = this.getHihgestScore()
    }else {
      data = "not hihgestScore"
    }

    return(
      <div className="component container-statistic">
        { menu }
        { data }

      </div>

    );
  }
}

export default Statistic;
