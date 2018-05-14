import React from 'react';
import './countscore.css';


class CountScore extends React.Component {
  state = {
    score: 0
  }
  componentDidMount(){
    let score = this.scoreCount(this.props.listOfAnswer,this.calcFunction,0);
    this.setState({score})
    let saveToFirbase = false;
    this.props.setScoreOfGame(score,saveToFirbase);
  }
  componentDidUpdate (){
    let score = this.scoreCount(this.props.listOfAnswer,this.calcFunction,0);

    if(this.state.score !== score){ // kontroll så vi inte skicka flera request till firebase till att spara data för score
       this.setState({score})
       let saveToFirbase = true;
       this.props.setScoreOfGame(score,saveToFirbase);
    }

  }

  calcFunction = (current, bonusCount) => {
    if(bonusCount > 1 ) {
      return (current += 15 + 10 * (bonusCount-1))
    }else if (bonusCount >= 1 ) {
      return (current += 15)
    }else{
      return current
    }
  }

  scoreCount = (array,calculate,start) => {
    let current = start;
    let bonusCount = 0;
    for(let item of array){
      if( item === 1 || item === 2 ){
        bonusCount++
      }else {
        bonusCount = 0
      }
      current = calculate(current, bonusCount)
    }
    return current
  };


  render(){


    return (
      <div className="component container-countscore">
        <div>{ this.state.score }p</div>
      </div>
    );
  }
}

export default CountScore;
