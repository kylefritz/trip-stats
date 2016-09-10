import * as _ from 'underscore'
import { createAction } from 'redux-actions'

export const loadTrips = () => {
    return (dispatch, getState) => {
      const roi = getState().roi
      if(!roi){
        console.warn("call to loadTrips without ROI")
        return
      }

      const request = {
        request: {
          url: '/',
          method: 'post',
          data: {
            points: roi
          }
        }
      }

      dispatch(createAction('LOAD_TRIPS')(request))
    }
}

export const setROI = (points) => {
  return (dispatch, getState) => {

    dispatch(createAction('SET_ROI')(points))
    dispatch(loadTrips())
  }
}
