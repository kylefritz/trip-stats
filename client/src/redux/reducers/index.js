import { combineReducers } from 'redux'

import trips from './trips'
import topTrips from './top_trips'
import totalTrips from './total_trips'
import tripsByHour from './trips_by_hour'
import tripsByDay from './trips_by_day'
import roi from './roi'
import loading from './loading'

export default combineReducers({
  trips,
  topTrips,
  totalTrips,
  tripsByHour,
  tripsByDay,
  roi,
  loading
})
