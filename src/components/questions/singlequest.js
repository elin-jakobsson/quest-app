import React, { Component } from 'react';
import './questions.css';



/*TODO
  triga ett en function när tiden går i singlequest

*/

class SingleQuest extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  } // constructor


  handleClick = (index,rightanswer) => {
    let answerList = ["a","b","c","d"];
    if (answerList[index]===rightanswer && this.props.timeIsOut === false) {
      this.props.updateQuestion(true);
      console.log('rätt!!');
    }else {
      this.props.updateQuestion(false);

      console.log('wrong');
      console.log('det rätta svaret är ',rightanswer);
    }
  } // handleClick

  getchooices = (singelQuest)=>{
    let answerList = ["a","b","c","d"];
    let list = []
    list.push(singelQuest.a);
    list.push(singelQuest.b);

    if(singelQuest.hasOwnProperty("c")){
      list.push(singelQuest.c);
    }
    if(singelQuest.hasOwnProperty("d")){
      list.push(singelQuest.d);
    }

    let inputElements;
    if (this.props.answerstate ==="") {
      inputElements = list.map((item,index)=> (<li className='neutralLi' onClick={()=>this.handleClick(index,singelQuest.rightanswer)} key={"key"+index}> { answerList[index] }. { item } </li>));

    }else {
      inputElements = list.map((item,index)=> (<li className='neutralLi' key={"key"+index}> { answerList[index] }. { item } </li>));

    }

    return inputElements;
    // retunera en klickbar lista med svarsalternativ
  } // getchooices

  getQuest = () => {

    let currentQuests = this.props.currentGame.questList;
    if(currentQuests.length < 1){
      return false;
    }
    let allQuests = this.props.allQuests
    //console.log(currentQuests);
    //let notAnsweredQuests = currentQuests.filter(quest => quest.answer === "x")
    let notAnsweredQuests = []
    for(let quest in currentQuests ){
      let selectedQuest = currentQuests[quest];

      if(selectedQuest.answer === "x"){
        notAnsweredQuests.push(selectedQuest);
      }
    }



    let questionsLeft = notAnsweredQuests.length;
    //this.setState({questionsLeft});

    let questKey = notAnsweredQuests[0].questKey;


    let singleQuest = allQuests[questKey];
    //console.log('single ',singleQuest);
    return  {singleQuest,questionsLeft}
    //returner lista med val
  }

  render(){
    let obj = this.getQuest();
    if(!obj){
      console.log("fail!");
    }
    let chooices = this.getchooices(obj.singleQuest)

    let nextButton;
    if (obj.questionsLeft > 1) {
      let endOfQuest = false;

      nextButton = (<button className='nextButton' onClick={ ()=> this.props.changeQuest(endOfQuest) }>Nästa </button>)
    } else {
      let endOfQuest = true;
      nextButton= (<button className='continueButton' onClick={ () => this.props.changeQuest(endOfQuest) }>Avsluta </button>)
    }

    return (<div className='singelQuest-container'>
              <h4 className='theQuetion'>{obj.singleQuest.question}</h4>
              <div>
                <ul>
                { chooices }
                </ul>
              </div>
              <div className='nextButton-container'>{ nextButton }</div>
          </div>);

  }// Render()

} // class SingleQuest

export default SingleQuest;
