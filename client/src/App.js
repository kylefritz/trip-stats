import React, { Component } from 'react'

import './App.css'
import Map from './Map'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Trip Stats</h2>
        </div>
        <Map markers={[]} onMapClick={ ()=> console.log("clicked")} />
      </div>
    );
  }
}

export default App;
