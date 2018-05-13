import React from 'react';
import './menu.css';

let menuList = ["Spel","HighScore","Profile"]
const Menu = (props) => {
  this.handleClick = item => {
    props.changePage(item);           // ändrar sida
    props.updatePlayerReady(false);  // varje gång man klickar på menyn så innebär det att spelaren inte är redo.
  }


  let menuBar = menuList.map(item => {
    let highLight = ""
    if(item===props.currentPage){
      highLight = "selected"
    }
    return (
      <li className={highLight} onClick= { () => this.handleClick(item) } key = { item }>
        <span className="circle"></span>
        { item }
      </li>
    )
  })

  return (
    <div className="component container-menu">
      <ul>{ menuBar }</ul>
    </div>
  );
}


export default Menu;
