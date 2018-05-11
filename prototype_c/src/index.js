import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {createLogger} from 'redux-logger'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App.js';
import rootReducer from './reducers'
import GameTimer from './game/GameTimer.js'
import {GAME_TICK} from "./actions";
import {addPerson} from "./actions/person";
import {addJob, progressJob, resetJob} from "./actions/jobs";

const logger = createLogger({
  'predicate': (getState, action) => {
    return action.doLog;
  }
});
const store = createStore(
  rootReducer,
  applyMiddleware(logger)
);

store.dispatch(addPerson('Fyodor', 'Ignatyevitch'));
store.dispatch(addJob('gathering', [store.getState().people[0].id]));

function progressJobs(state) {
  state.jobs.forEach((job) => {
    if (job.peopleIds.length) {
      store.dispatch(progressJob(job.id))
    }
  });
}

function completeJobs(state) {
  state.jobs.forEach((job) => {
    if (job.peopleIds.length) {
      if (job.type === 'gathering' && job.done >= 1200) {
        store.dispatch(resetJob(job.id));
      }
    }
  });
}

GameTimer.startTicking(() => {
  store.dispatch({type: GAME_TICK});
  const state = store.getState();
  progressJobs(state);
  completeJobs(state)
});

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
