import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {createLogger} from 'redux-logger'
import log from 'loglevel';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App.js';
import rootReducer from './reducers'
import GameTimer from './game/GameTimer'
import {GAME_TICK} from "./actions";
import {addPerson} from "./actions/person";
import {addActivity, progressActivity, resetActivity} from "./actions/activities";

log.setDefaultLevel("debug");

const store = createStore(
  rootReducer,
  loadGame(),
  applyMiddleware(createLogger({
    'predicate': (getState, action) => action.doLog
  }))
);

if (!store.getState().people || !store.getState().people.length) {
  store.dispatch(addPerson('Fyodor', 'Ignatyevitch'));
  store.dispatch(addActivity('gathering', store.getState().people[0].id));
}

function progressActivities(state) {
  state.activities.forEach((activity) => {
    store.dispatch(progressActivity(activity.id))
  });
}

function completeActivities(state) {
  state.activities.forEach((activity) => {
    if (activity.type === 'gathering' && activity.done >= 1200) {
      store.dispatch(resetActivity(activity.id));
    }
  });
}

function saveGame(state) {
  if (state.tick % 120) return;

  localStorage.setItem('gameState', JSON.stringify(state));
  log.debug('Game saved');
  log.debug(state);
}

function loadGame() {
  const state = localStorage.getItem('gameState');
  // const state = "{}";
  return state ? JSON.parse(state) : {};
}

GameTimer.startTicking(() => {
  store.dispatch({type: GAME_TICK});
  const state = store.getState();
  progressActivities(state);
  completeActivities(state);
  saveGame(state);
});

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
