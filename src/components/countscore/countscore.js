import React from 'react';
import './countscore.css';

let listOfAnswer = [0,1,1,2,"x","x","x","x","x","x"]

const CountScore = props => {

  let calcFunction = (current, bonusCount) => {
    console.log("bonusStege: " + bonusCount);
    if(bonusCount > 1 ) {
      console.log("Bonus!");
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
      }else{
        bonusCount = 0
      }
      current = calculate(current, bonusCount)
      console.log("current" + current);
    }
    return current
  };

  let score = scoreCount(listOfAnswer,calcFunction,0);
  return (
      <div className="component container-countscore">
        <div>{ score }p</div>
      </div>
  );

}

export default CountScore;
