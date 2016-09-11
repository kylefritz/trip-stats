import { createAction } from 'redux-actions'

const formatApiAction = (actionName, path, roi) =>{
  const request = {
    request: {
      url: path,
      method: 'post',
      data: {
        points: roi
      }
    }
  }

  return createAction(actionName)(request)
}

export const loadTrips = () => {
    return (dispatch, getState) => {
      const roi = getState().roi
      if(!roi){
        console.warn("call to loadTrips without ROI")
        return
      }

      dispatch(formatApiAction('LOAD_TRIPS_BY_LOCATION', '/group_by_location', roi))
      dispatch(formatApiAction('LOAD_TRIPS_BY_HOUR', '/group_by_hour', roi))
      dispatch(formatApiAction('LOAD_TRIPS_BY_DAY', '/group_by_day', roi))
    }
}

export const setROI = (points) => {
  return (dispatch, getState) => {

    dispatch(createAction('SET_ROI')(points))
    dispatch(loadTrips())
  }
}
