import { handleActions } from 'redux-actions'
import * as _ from 'underscore'

export default handleActions({
  LOAD_TRIPS_BY_HOUR: (state, action) => {
    let nextState = {...state}
    nextState.byHour = true
    return nextState
  },
  LOAD_TRIPS_BY_HOUR_SUCCESS: (state, action) => {
    let nextState = {...state}
    nextState.byHour = false
    return nextState
  },
  LOAD_TRIPS_BY_DAY: (state, action) => {
    let nextState = {...state}
    nextState.byDay = true
    return nextState
  },
  LOAD_TRIPS_BY_DAY_SUCCESS: (state, action) => {
    let nextState = {...state}
    nextState.byDay = false
    return nextState
  },
  LOAD_TRIPS_BY_LOCATION: (state, action) => {
    let nextState = {...state}
    nextState.byLocation = true
    return nextState
  },
  LOAD_TRIPS_BY_LOCATION_SUCCESS: (state, action) => {
    let nextState = {...state}
    nextState.byLocation = false
    return nextState
  }

}, {})
