import React, { Component } from 'react';
import './App.css';
import Map from './Map'
import ListView from './ListView'
import {allLocation} from './locations.js'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class App extends Component {
  
  state = {
    query: '',
    selectedItem:''
   }

   updateQuery = (query) => {
       this.setState({query : query})
     }

  updateSelectedItem = (item) =>{
       this.setState({selectedItem : item})
  }

  render() {
    let ShowingLocation
    if(this.state.query){
       const match = new RegExp(escapeRegExp(this.state.query),'i')
        ShowingLocation = allLocation.filter( (location) => match.test(location.title))
    } else{
        ShowingLocation = allLocation
      }
      ShowingLocation.sort(sortBy('title'))
    return (
      <div className="App">
        <header className="App-header" role="banner">
          <h1 className="App-title">Jeddah Universities</h1>
        </header>
        <Map allLocation={ShowingLocation} selectedItem={this.state.selectedItem}/>
        <ListView allLocation={ShowingLocation} updateQuery={this.updateQuery} updateSelectedItem={this.updateSelectedItem}/>

      </div>
    );
  }
}

export default App;
