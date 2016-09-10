import { handleActions } from 'redux-actions';

export default handleActions({
  LOAD_TRIPS_SUCCESS: (state, action) => {
    return action.payload.data
  }
}, []);
