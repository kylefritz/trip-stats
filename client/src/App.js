import React, { Component } from 'react'
import { connect } from 'react-redux'

import './App.css'
import Map from './components/Map'
import {loadTrips} from './redux/actions'

class App extends Component {
  componentWillMount(){
    this.props.dispatch(loadTrips())
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Trip Stats</h2>
        </div>
        <Map markers={[]} onMapClick={()=> ({}) } />
      </div>
    );
  }
}

export default connect((redux) => {
  return redux
})(App)
