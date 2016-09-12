import React, { Component } from 'react'

import {setTimeOfDay} from '../../redux/actions'

export default class TimeOfDay extends Component {
  render() {
    const {type, range} = this.props.timeOfDay
    return (
      <ul className="time-of-day">
        <li>Filter Time</li>
        <li>
          <a href="#" onClick={()=> this.selectTime('all')}
            className={this.renderClass("all")}>All</a>
        </li>
        <li>
          <a href="#" onClick={()=> this.selectTime('day')}
            className={this.renderClass("day")}>Day</a>
        </li>
        <li>
          <a href="#" onClick={()=> this.selectTime('night')}
            className={this.renderClass("night")}>Night</a>
        </li>
        <li>
          <a href="#" onClick={()=> this.selectTime('custom')}
            className={this.renderClass("custom")}>
            {`Custom ${ type ==='custom' ? range : ''}`}
          </a>
        </li>
      </ul>
    )
  }

  renderClass(type){
    if(this.props.timeOfDay.type === type){
      return 'active'
    }
    return null
  }

  selectTime(type){
    let range = null
    if(type === 'custom'){
        range = prompt("Enter range of hours to filter. 24 hour time; seperate with colon; inclusive. (e.g. 8:16)")
    }

    this.props.dispatch(setTimeOfDay({type, range}))
  }
}
