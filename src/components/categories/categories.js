import React from 'react';
import './categories.css'

export default class Categories extends React.Component{
  state = {
    selectedCategori : 0
  }

  changeCategori = (item) => {
    console.log(item);
    this.setState({
      selectedCategori : item
    })
  }

  setupCategoriLi = (list) => {
    let newList = list.map(item => { // SKapar en lista med element
        return(
          <li key={item.title} onClick={()=>this.changeCategori(item.title)}>
            <div className="boxShortName" style= {{ backgroundColor: item.bgColor }}>{item.shortname}</div>
            <div className="boxMain">
              <div>
                <span>{item.title}</span>
                {item.description}
              </div>
            </div>
          </li>
        )
    })

    return (<ul> {newList} </ul>)
  }

  render(){
    let categoriesList = this.setupCategoriLi(
        [
          {
            title:"Css",
            shortname: "Css",
            description: "Anta utmaningen och svara på frågor med webbdesin i fokus",
            bgColor: "#3B6689"
          },
          {
            title:"Html",
            shortname: "Html",
            description: "Lär dig mer om HTML och element.",
            bgColor: "#60AB25"
          },
          {
            title:"Javascript",
            shortname: "Js",
            description: "Anta utmaningen och svara på frågor inom det populäraste programeringsspråket just nu.",
            bgColor: "#F7BF35"
          }
      ]
    );

    return(
        <div className="component container-categories">
          {categoriesList}
        </div>
    ); // return end
  }; // render end
}; // cattegories end
