import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import {formatNumber} from 'accounting'

import TopTrips from '../components/stats/top_trips'
import Histogram from '../components/stats/histogram'

class Stats extends Component {
  render() {
    if(this.props.loading.byLocation){
      return <div className="stats"><h1>Loading Trips...</h1></div>
    }

    const dow = ['Sun', 'Mon', "Tue", "Wed", "Thu", "Fri", "Sat"]
    return (
      <div className="stats">
        <h1>
          <span>{`${formatNumber(this.props.totalTrips)} `}</span>
          <span>Total Trips</span>
        </h1>
        <h3>Trips by Hour</h3>
        <Histogram
          loading={this.props.loading.byHour}
          data={this.props.tripsByHour}
          xLabel="Hour"
          xFunction={(d)=> moment("1995-12-25").add(d*2,'h').format("hA") }
          />
        <h3>Trips by Day</h3>
        <Histogram
          loading={this.props.loading.byDay}
          data={this.props.tripsByDay}
          xLabel="Day"
          xFunction={(d)=> dow[d]}
          />
        <TopTrips topTrips={this.props.topTrips} />
      </div>
    )
  }
}




export default connect((redux) => {
  return redux
})(Stats)
