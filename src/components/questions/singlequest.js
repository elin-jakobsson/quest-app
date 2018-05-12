import React, { Component } from 'react';
import './questions.css';


class SingleQuest extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  } // constructor()


  componentDidMount(){

  }


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
    // console.log("funkar!!");
    // console.log('index', index);

    // om vi hinner att svara innnan tiden har gått ut och svaret är rätt så ska true skickas upp till Questions
    // om tiden gått ut eller om användaren svarade fel så ska vi skicka upp false
    // this.props.update(true eller false);
    //här ska vi kolla om svaret som användaren angett är ok.
    //därefter spara ner till firebase och fortsätta med nästa fråga.
  }

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

    let inputElements = list.map((item,index)=> (<li onClick={()=>this.handleClick(index,singelQuest.rightanswer)} key={"key"+index}> { answerList[index] }. { item } </li>));
    return inputElements;
    // retunera en klickbar lista med svarsalternativ
  }

  getQuest = () => {
    let currentQuests = this.props.currentGame.questList;
    let allQuests = this.props.allQuests
    //console.log(currentQuests);
    let notAnsweredQuests = currentQuests.filter(quest => quest.answer === "x")
    //console.log('after filter ',notAnsweredQuests);
    let questKey = notAnsweredQuests[0].questKey;

    let singleQuest = allQuests[questKey];
    //console.log('single ',singleQuest);
    return singleQuest;
    //returner lista med val
  }

  render(){
    let singleQuest = this.getQuest();
    let chooices = this.getchooices(singleQuest)

    return (<div>
              <h4>{singleQuest.question}</h4>


              <div>
                <ul>
                { chooices }
                </ul>
              </div>


          </div>);

  }// Render()

} // class SingleQuest

export default SingleQuest;
