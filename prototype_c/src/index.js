import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import GameTimer from './game/GameTimer.js'

import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReducer);

GameTimer.startTicking(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
