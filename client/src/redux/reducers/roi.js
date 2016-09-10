import { handleActions } from 'redux-actions';

const defaultRois = [
  {lat: 40.755, lng: -73.98},
  {lat: 40.755, lng: -73.99},
  {lat: 40.76, lng: -73.99},
  {lat: 40.76, lng: -73.98},
  {lat: 40.755, lng: -73.98}
]

export default handleActions({
  SET_ROI: (state, action) => {
    return action.payload
  }

}, defaultRois);
