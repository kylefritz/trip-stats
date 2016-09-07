import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';

const trips = handleActions({
  LOAD_TRIPS_SUCCESS: (state, action) => {
    return action.payload.data
  }
}, []);

export default combineReducers({
  trips
})
