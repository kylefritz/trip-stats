import { createAction } from 'redux-actions'
import * as _ from 'underscore'

const formatApiAction = (actionName, path, roi, time) =>{
  const request = {
    request: {
      url: path,
      method: 'post',
      data: {
        points: roi,
        time
      }
    }
  }

  return createAction(actionName)(request)
}
const geocoder = new google.maps.Geocoder();

export const loadTrips = () => {
    return (dispatch, getState) => {
      const roi = getState().roi
      if(!roi){
        console.warn("call to loadTrips without ROI")
        return
      }
      const {type, range} = getState().timeOfDay
      const timeOfDay = type === 'custom' ? range : type

      dispatch(formatApiAction('LOAD_TRIPS_BY_LOCATION', '/group_by_location', roi, timeOfDay)).then((xhr)=>{
        const trips = xhr.payload.data
        _.compact(_.range(7).map((i)=> trips[i])).map((trip) => {
          geocoder.geocode({'location': trip}, (results, status) => {
            if (status !== 'OK') {
              return
            }
            const result = results[1]
            if(result){
                dispatch(createAction('GEOCODE_TRIP')({...trip, pickup: result.formatted_address}))
            }
          });
        })
      })
      dispatch(formatApiAction('LOAD_TRIPS_BY_HOUR', '/group_by_hour', roi, timeOfDay))
      dispatch(formatApiAction('LOAD_TRIPS_BY_DAY', '/group_by_day', roi, timeOfDay))
    }
}

export const setROI = (points) => {
  return (dispatch, getState) => {

    dispatch(createAction('SET_ROI')(points))
    dispatch(loadTrips())
  }
}

export const setTimeOfDay = (time)=>{
  return (dispatch, getState) => {
    dispatch(createAction('SET_TIME_OF_DAY')(time))
    dispatch(loadTrips())
  }
}
