import React from 'react';
import './queststart.css';


const QuestStart = props =>{

  let obj = {}
  if(props.selectedCategori==="html"){
    obj.category = "html";
    obj.colour = "#60AB25";
    obj.text = "Frågor om HTML";
  }else if (props.selectedCategori==="css") {
    obj.category = "css";
    obj.colour = "#477AA4";
    obj.text = "Frågor om CSS";
  } else {
    obj.category = "js";
    obj.colour = "#F7BF35";
    obj.text = "Frågor om JAVASCRIPT"
  }

  //console.log(obj);
  this.handleStartGame=()=>{
    props.updatePlayerReady(true);
  }

  return(
    <div className="component container-queststart">
      <div className="wrapper">
        <div className='goBackToCategoris'><p onClick={()=>props.chooseCategori("")}>&times;</p></div>
        <div className="box" style= {{backgroundColor : obj.colour}}>{ obj.category }</div>
        <div> { obj.text } </div>
        <span>Redo!</span>
        <button onClick={this.handleStartGame}>Start</button>
      </div>
    </div>
  )
}

export default QuestStart;
