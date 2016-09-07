import { createStore, applyMiddleware } from 'redux'

import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import axiosMiddleware from 'redux-axios-middleware'
import axios from 'axios'

// development
const client = axios.create({
  baseURL: 'http://localhost:5000',
  responseType: 'json'
})

// export create store function
export default applyMiddleware(
  axiosMiddleware(client),
  thunk,
  promiseMiddleware,
  createLogger()
)(createStore)
