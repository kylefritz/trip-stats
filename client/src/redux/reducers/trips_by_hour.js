import { handleActions } from 'redux-actions'

export default handleActions({
  LOAD_TRIPS_BY_HOUR: (state, action) => {
    return [] // clear trips until xhr returns
  },
  LOAD_TRIPS_BY_HOUR_SUCCESS: (state, action) => {
    return action.payload.data
  }
}, [])
