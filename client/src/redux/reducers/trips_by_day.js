import { handleActions } from 'redux-actions'

export default handleActions({
  LOAD_TRIPS_BY_DAY: (state, action) => {
    return [] // clear trips until xhr returns
  },
  LOAD_TRIPS_BY_DAY_SUCCESS: (state, action) => {
    return action.payload.data
  }
}, [])
