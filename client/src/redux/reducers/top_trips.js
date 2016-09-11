import { handleActions } from 'redux-actions'
import * as _ from 'underscore'

export default handleActions({
  RESET_TOP_TRIPS: (state, action) => {
    return {}
  },
  GEOCODE_TRIP: (state, action) => {
    let nextState = {...state}
    const {pickup, count} = action.payload
    if(!nextState[pickup]){
      nextState[pickup] = action.payload
    }else{
      nextState[pickup].count += count
    }

    return nextState
  }
}, {});
