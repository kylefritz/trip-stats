import React, { Component } from 'react'
import { connect } from 'react-redux'

import './App.css'
import Map from './components/Map'
import {doSomething} from './redux/actions'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Trip Stats</h2>
        </div>
        <Map markers={[]} onMapClick={ ()=> this.props.dispatch(doSomething({foo: 'bar'}))} />
      </div>
    );
  }
}

export default connect((redux) => {
  return redux
})(App)
