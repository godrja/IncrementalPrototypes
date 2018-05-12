import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import log from 'loglevel';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App.js';
import {initializeGame} from "./game";

log.setDefaultLevel("debug");

const game = initializeGame();

ReactDOM.render(
  <Provider store={game.getStore()}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

game.start();