import {combineReducers} from 'redux'
import people from './people';
import storage from "./storage";
import {GAME_TICK} from "../actions";
import tick from "./tick";
import {switchActivity} from "../actions/people";
import {getAllItemsInNaturalOrder} from "../game";
import * as gameRules from "../game/GameRules";


const rootReducer = combineReducers({tick, people, storage});

const gameTick = (state) => {

  const switchActivityForPerson = person =>
    switchActivity(person.id, person.activity.type === "idle" ? "gathering" : "idle");

  const switchActionsForAllPeople = state =>
    getAllItemsInNaturalOrder(state.people)
      .map((person) => switchActivityForPerson(person));

  return gameRules.nextState([switchActionsForAllPeople], state, rootReducer);
};

export default function (state, action) {
  const {type} = action;
  switch (type) {
    case GAME_TICK:
      return gameTick(state);
    default:
      return rootReducer(state, action);
  }
}
