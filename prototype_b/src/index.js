import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import Engine from './components/Engine.js'

import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

const startByTimer = (timer, sliceName) => {
  timer(() => store.dispatch({type: 'TICK', sliceName: sliceName}));
}

const engine = new Engine();
startByTimer(engine.bindClockTickByInterval, 'byInterval');
startByTimer(engine.bindClockTickByTimeout, 'byTimeout');
startByTimer(engine.bindClockTickByAnimationFrame, 'byAnimationFrame');
