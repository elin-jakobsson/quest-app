import React from 'react';
import './countscore.css';


const CountScore = props => {

  let calcFunction = (current, bonusCount) => {
    if(bonusCount > 1 ) {
      return (current += 15 + 10 * (bonusCount-1))
    }else if (bonusCount >= 1 ) {
      return (current += 15)
    }else{
      return current
    }
  }

  let scoreCount = (array,calculate,start) => {
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

  let score = scoreCount(props.listOfAnswer,calcFunction,0);
  return (
      <div className="component container-countscore">
        <div>{ score }p</div>
      </div>
  );

}

export default CountScore;
