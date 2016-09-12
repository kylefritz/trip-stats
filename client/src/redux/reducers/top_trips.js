import { handleActions } from 'redux-actions'

export default handleActions({
  LOAD_TRIPS_BY_LOCATION: (state, action) => {
    return {} // clear trips until xhr returns
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
