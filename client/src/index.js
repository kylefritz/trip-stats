import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import reducer from './redux/reducers'
import createStore from './redux/store'
import App from './App';
import './index.css';

const store = createStore(reducer)

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('root')
);
