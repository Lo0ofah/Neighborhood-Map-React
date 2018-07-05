import React, { Component } from 'react';
import './App.css';

class ListView extends Component {


  render(){
    return(
    <div className="ListView-container" role="main">
    <input
    type="text"
    placeholder="search"
    tabindex="0"
    value={this.props.query}
    onChange={(event) => this.props.updateQuery(event.target.value.trim())}/>
    <ul className="locationList" tabindex="0"  aria-label="location list">
  { this.props.allLocation.map( (location, index) => (
      <li
      tabindex="0"
      aria-label = {"View Details for "+ location.title}
      Key={index}
      onClick={(event)=>this.props.updateSelectedItem(event.target.textContent.trim())}
       > {location.title}</li>
    ))}
    </ul>
    </div>
  )
  }

}
export default ListView;
