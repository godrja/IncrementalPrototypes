import {addPerson} from "../actions/people";
import {applyMiddleware, createStore} from "redux";
import {createLogger} from "redux-logger";
import rootReducer from "../reducers";
import log from "loglevel"
import GameTimer from "./GameTimer";
import {GAME_TICK} from "../actions";
import {nextId} from "../utils";
import {updateItemCountInStorage} from "../actions/storage";

export function initializeGame() {
  function createGameStore() {
    function loadGame() {
      const state = localStorage.getItem('defaultSave');
      return state ? JSON.parse(state) : {};
    }
    return createStore(
      rootReducer,
      loadGame(),
      applyMiddleware(createLogger({
        'predicate': (getState, action) => action.doLog
      }))
    );
  }

  function isGameInitialized(state) {
    return state.tick > 0;
  }

  function initialize(store) {
    const fyodorId = nextId('person', 'fyodor');
    store.dispatch(addPerson(fyodorId, 'Fyodor Ignatyevitch'));
    store.dispatch(updateItemCountInStorage("branch"));
  }

  const store = createGameStore();
  if (!isGameInitialized(store.getState())) {
    initialize(store)
  }
  return {
    start: () => startGame(store),
    getStore: () => store
  };
}

export function startGame(store) {
  function saveGame(state) {
    if (state.tick % 120) return;

    localStorage.setItem('gameState', JSON.stringify(state));
    log.debug('Game saved');
    log.debug(state);
  }

  GameTimer.startTicking(() => {
    store.dispatch({type: GAME_TICK});
    const state = store.getState();
    saveGame(state);
  });
}

export const getAllItemsInNaturalOrder = (state) => state.allIds.map((id) => state.byId[id]);
