import React from 'react';
import './queststart.css';


const QuestStart = props =>{

  this.handleStartGame=()=>{
    console.log("skicka upp ett värde till parent!!");
    props.updatePlayerReady(true);
  }
  return(
    <div className="component container-queststart">
      <div className="wrapper">
        <div className="box">Js</div>
        <div>Javascript Quests</div>
        <span>Redo!</span>
        <button onClick={this.handleStartGame}>Start Spelet</button>
      </div>
    </div>
  )
}

export default QuestStart;
