import React, { Component } from 'react';
import './App.css';

class ListView extends Component {


  render(){
    return(
    <div className="ListView-container">
    <input type="text" placeholder="search Location"
    value={this.props.query}
    onChange={(event) => this.props.updateQuery(event.target.value)}/>
    <ul className="locationList">
  { this.props.allLocation.map( (location, index) => (
      <li
      Key={index}
       > {location.title}</li>
    ))}
    </ul>
    </div>
  )
  }

}
export default ListView;
