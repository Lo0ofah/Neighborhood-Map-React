import React, { Component } from 'react';
import './App.css';

class ListView extends Component {
/*
handleKeyPress
when the user press enter in the list view location
*/
  handleKeyPress(event) {
    if(event.charCode === 13){
     this.props.updateSelectedItem(event.target.textContent.trim())
   }
 }

  render(){
    return(
    <div className="ListView-container" role="main">
    <input
    type="text"
    placeholder="search"
    tabIndex="0"
    value={this.props.query}
    onChange={(event) => this.props.updateQuery(event.target.value.trim())}/>
    <ul className="locationList" tabIndex="0"  aria-label="location list">
    { this.props.allLocation.map( (location, index) => (
      <li
      tabIndex="0"
      aria-label = {"View Details for "+ location.title}
      key={index}
      onClick={(event)=>this.props.updateSelectedItem(event.target.textContent.trim())}
      onKeyPress={(event)=> this.handleKeyPress(event)}
       > {location.title}</li>
    ))}
    </ul>
    </div>
  )
  }

}
export default ListView;
