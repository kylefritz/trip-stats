import { createStore, applyMiddleware } from 'redux'

import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import axiosMiddleware from 'redux-axios-middleware'
import axios from 'axios'

const baseURL = (location.hostname === "localhost") ? 'http://localhost:5000' : 'https://trip-stats.herokuapp.com'

const client = axios.create({
  baseURL,
  responseType: 'json'
})

// export create store function
export default applyMiddleware(
  axiosMiddleware(client),
  thunk,
  createLogger(),
  promiseMiddleware
)(createStore)
