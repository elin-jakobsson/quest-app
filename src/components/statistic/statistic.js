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

  getHihgestScore = () => {
    console.log("the list is called");
    let list = this.props.games;
    let newList = [];
    for(let item in list){
      console.log(item);
      newList.push(
        (<li>{ item }</li>)
      )
    }
    return (<ul>{newList}</ul>);
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
