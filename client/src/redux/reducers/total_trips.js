import { handleActions } from 'redux-actions'
import * as _ from 'underscore'

export default handleActions({
  LOAD_TRIPS_BY_LOCATION: (state, action) => {
    return 0 // clear trips until xhr returns
  },
  LOAD_TRIPS_BY_LOCATION_SUCCESS: (state, action) => {
    const trips = action.payload.data
    return trips.map((t) => t.count).reduce((a, b) => {
      return a + b
    }, 0)
  }
}, 0);
