import {addPerson} from "../actions/person";
import {addActivity, progressActivity, resetActivity} from "../actions/activities";
import {applyMiddleware, createStore} from "redux";
import {createLogger} from "redux-logger";
import rootReducer from "../reducers";
import log from "loglevel"
import GameTimer from "./GameTimer";
import {GAME_TICK} from "../actions";

export function getCurrentActivityOf(personId, activities) {
  return activities.find((activity) => activity.personId === personId);
}

export function person(person) {
  return {currentActivity: getCurrentActivityOf.bind(this, person.id)}
}

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
    store.dispatch(addPerson('Fyodor', 'Ignatyevitch'));
    store.dispatch(addActivity('gathering', store.getState().people.profiles[0].id));
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
  function progressActivities(state) {
    state.people.activities.forEach((activity) => {
      store.dispatch(progressActivity(activity.id))
    });
  }

  function completeActivities(state) {
    state.people.activities.forEach((activity) => {
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

  GameTimer.startTicking(() => {
    store.dispatch({type: GAME_TICK});
    const state = store.getState();
    progressActivities(state);
    completeActivities(state);
    saveGame(state);
  });
}