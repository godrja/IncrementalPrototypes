import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import Engine, { GameTimer } from './game/Engine.js'
import GameTimerFun from './game/GameTimer.js'
import { GAME_TICK } from './actions'

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
  timer(() => store.dispatch({type: GAME_TICK, sliceName: sliceName}));
}

const engine = new Engine();
//startByTimer(engine.bindClockTickByInterval, 'byInterval');
//new GameTimer(store).startTicking();
const timer = GameTimerFun.startTicking(store);
startByTimer(engine.bindClockTickByTimeout, 'byTimeout');
startByTimer(engine.bindClockTickByAnimationFrame, 'byAnimationFrame');
timer.stopTicking();
timer.stopTicking();
