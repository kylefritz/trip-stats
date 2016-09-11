import { handleActions } from 'redux-actions'
import * as _ from 'underscore'

export default handleActions({
  LOAD_TRIPS_BY_HOUR_SUCCESS: (state, action) => {
    return action.payload.data
  }
}, [])
