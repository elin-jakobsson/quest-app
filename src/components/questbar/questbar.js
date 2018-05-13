import React from 'react';
import './questbar.css';

let bgColor = {
  0 : "rgba(232, 85, 93, 0.8)",
  1 : "rgba(96, 171, 37, 0.8)",
  2 : "rgba(241, 172, 93, 0.8)",
  x : "rgba(125, 125, 125, 0.4)"
}

const QuestBar = props =>{
  let questbar = props.listOfAnswer.map((item,index) => {
    return (<div key={index} style={{backgroundColor: bgColor[item] }} className="boxBar"></div>)
  })

  return (
    <div className="component container-questbar">
      {questbar}
    </div>
  )
}

export default QuestBar;
