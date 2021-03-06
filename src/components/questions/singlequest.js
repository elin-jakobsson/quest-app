import React, { Component } from 'react';
import './questions.css';



/*TODO
  triga ett en function när tiden går i singlequest

*/

class SingleQuest extends Component {
  constructor(props){
    super(props);
    this.state={
      answerIndex : ""
    }
  } // constructor


  handleClick = (index,rightanswer) => {
    let answerList = ["a","b","c","d"];
    if (answerList[index]===rightanswer && this.props.timeIsOut === false) {
      this.props.updateQuestion(true);

    }else {
      this.props.updateQuestion(false);

    }

    this.setState({answerIndex:index}) // sätter vilket index av vad användaren svarat
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
    //let objPropertys = Object.keys(singelQuest);


    /*---Här är css classerna när de är neutrala tanken ät att deras värden ska ändras om
          svaret är true eller false och markera det rätta svaret*/
    //let displayTrueAnswer = 'neutralLi';
    //let falseAnswer = 'neutralLi';

    let inputElements;
    if (this.props.answerstate ==="") {
      inputElements = list.map((item,index)=> (<li className='neutralLi' onClick={()=>this.handleClick(index,singelQuest.rightanswer)} key={"key"+index}> <span> { answerList[index] }.  { item } </span> </li>));

    }else {

      inputElements = list.map((item,index)=>{
        let selectClass = "";

        if(answerList[index] === singelQuest.rightanswer){
          selectClass = "rightLi"
        }

        if( this.state.answerIndex === index ){ //plockar ut det som användaren har gissat på
            if(answerList[index]=== singelQuest.rightanswer){  // om användare svarade rätt
              selectClass = "rightAnswerLi"
            }else{                                              // om användare svarade fel
              selectClass = "wrongAnswerLi"
            }
        }

        return (<li className="neutralLi"  key={"key"+index}> <span className = { selectClass }> { answerList[index] }. { item }</span> </li>);
      });

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

    let questKey = notAnsweredQuests[0].questKey;


    let singleQuest = allQuests[questKey];

    return  {singleQuest,questionsLeft}
    //returner lista med val
  }

  handleClickChangeQuest = (endOfQuest) => {
    this.setState({answerIndex:""})
    this.props.changeQuest(endOfQuest)
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

      nextButton = (<button className='nextButton' onClick={ ()=> this.handleClickChangeQuest(endOfQuest) }>Nästa </button>)
    } else {
      let endOfQuest = true;
      nextButton= (<button className='continueButton' onClick={ () => this.handleClickChangeQuest(endOfQuest) }>Avsluta </button>)
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
