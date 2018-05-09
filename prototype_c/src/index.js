import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import App from './components/App.js';
import rootReducer from './reducers'
import GameTimer from './game/GameTimer.js'
import { GAME_TICK } from "./actions";

const logger = createLogger({
   predicate: (getState, action) => { return action.type !== 'GAME_TICK'; }
});
const store = createStore(
    rootReducer,
    applyMiddleware(logger)
);

GameTimer.startTicking(() => {
  store.dispatch({ type: GAME_TICK });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();




function test() { console.log('test'); }
export { test };
