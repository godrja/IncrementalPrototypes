import {combineReducers} from 'redux'
import people from './people';
import storage from "./storage";
import {GAME_TICK} from "../actions";
import tick from "./tick";
import {switchActivity} from "../actions/people";
import * as gameRules from "../game/gameRules";
import gameState from "../game/gameState"

function processGameTick(state, rootReducer) {
  const switchActivityForPerson = person =>
    switchActivity(person.id, person.activity.type === "idle" ? "gathering" : "idle", state.tickCount);

  const switchActionsForAllPeople = state =>
    gameState(state).getPeople().map((person) => switchActivityForPerson(person));

  console.log(gameState(state).getPeople());
  return gameRules.nextState([switchActionsForAllPeople], state, rootReducer);
}

export default function rootReducer(state, action) {
  const generalReducer = combineReducers({tick, people, storage});
  const {type} = action;
  switch (type) {
    case GAME_TICK:
      return processGameTick(state, generalReducer);
    default:
      return generalReducer(state, action);
  }
}
