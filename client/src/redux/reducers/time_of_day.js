import { handleActions } from 'redux-actions'

const all = 'all'
const day = 'day'
const night = 'night'
const custom = 'custom'

export default handleActions({
  SET_TIME_OF_DAY: (state, action) => {
    return action.payload
  }
}, {type: 'all', range: null})
