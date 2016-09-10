import React, { Component } from 'react'

import Map from './containers/map'
import Stats from './containers/stats'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Trip Stats</h2>
        </div>
        <section className="dashboard">
          <Map />
          <Stats />
        </section>
      </div>
    );
  }
}
