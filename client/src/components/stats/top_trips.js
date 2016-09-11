import React, { Component } from 'react'

export default class TopTrips extends Component {
  render() {
    return (
      <div className="top-trips">
          <h3>Top Trips</h3>
          {this.props.topTrips.map((trip, index)=>{
            return (
              <p key={index}>{`count: ${trip.count} lat/lng: ${trip.lat},${trip.lng}`}</p>
            )
          })}
      </div>
    )
  }
}
