import { combineReducers } from 'redux'

import trips from './trips'
import topTrips from './top_trips'
import roi from './roi'

export default combineReducers({
  trips,
  topTrips,
  roi
})
