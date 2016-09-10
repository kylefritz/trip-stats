import { handleActions } from 'redux-actions'
import * as _ from 'underscore'

export default handleActions({
  LOAD_TRIPS_SUCCESS: (state, action) => {
    const trips = action.payload.data
    return _.compact(_.range(5).map((i)=> trips[i]))
  }
}, []);
