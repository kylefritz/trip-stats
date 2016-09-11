import React, { Component } from 'react'
import * as _ from 'underscore'
import {formatNumber} from 'accounting'

export default class TopTrips extends Component {
  render() {
    return (
      <div className="top-trips">
          <h3>Top Trips</h3>
          {_.sortBy(_.values(this.props.topTrips), (t)=> -t.count).map((trip, index)=>{
            return (
              <div key={trip.pickup}>
                <h4>{trip.pickup}</h4>
                <div className="trip-details">
                  <div>{`${formatNumber(trip.count)} Trips`}</div>
                  <div>{`lat/lng: ${trip.lat},${trip.lng}`}</div>
                </div>
              </div>
            )
          })}
      </div>
    )
  }
}
