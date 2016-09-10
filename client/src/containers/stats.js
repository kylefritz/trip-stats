import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as _ from 'underscore'

class Stats extends Component {
  render() {
    return (
      <div className="stats">
          <h2>Stats!</h2>
          {this.props.trips.map((trip)=>{
            return (
              <p key={trip.id}>{`count: ${trip.count} lat/lng: ${trip.lat}, ${trip.lng}`}</p>
            )
          })}
      </div>
    )
  }
}

export default connect((redux) => {
  const topTrips = _.compact(_.range(Math.min((redux.trips||[]).length, 4)).map((i)=> ({...redux.trips[i], id: i})))
  return {
    trips: topTrips
  }
})(Stats)
