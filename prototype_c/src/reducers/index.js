import {combineReducers} from 'redux'
import people from './people';
import storage from "./storage";
import {GAME_TICK} from "../actions";
import tick from "./tick";
import {switchActivity} from "../actions/people";
import {getAllItemsInNaturalOrder} from "../game";

const rootReducer = (state, action) =>
  combineReducers({tick, people, storage})(state, action);

const switchActivityForPerson = person =>
  switchActivity(person.id, person.activity.type === "idle" ? "gathering" : "idle");

const switchActivityActionReducer = (actions, person) => {
  actions.push(switchActivityForPerson(person));
  return actions;
};

const someGameThing = state =>
  getAllItemsInNaturalOrder(state.people)
    .reduce(switchActivityActionReducer, []);

const gameTick = (state) => {
  const actionsToState = (state, action) => rootReducer(state, action);
  const functionsToState = (state, fn) => fn(state).reduce(actionsToState, state);
  return [someGameThing].reduce(functionsToState, state);
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
