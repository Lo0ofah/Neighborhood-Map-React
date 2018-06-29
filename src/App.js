import React, { Component } from 'react';
import Map from './Map'
import './App.css';
import {allLocation} from './locations.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Jeddah Universities</h1>
        </header>

        <Map allLocation={allLocation}/>

      </div>
    );
  }
}

export default App;
