import { createAction } from 'redux-actions'

export const loadTrips = createAction('LOAD_TRIPS', (payload) => {
  return {
    request: {
      url: '/'
    }
  }
})
