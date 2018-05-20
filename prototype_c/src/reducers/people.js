import { combineReducers } from 'redux';
import {ADD_PERSON, SWITCH_ACTIVITY} from '../actions/people';

function profile(payload) {
  return {
    id: payload.id,
    name: payload.name
  };
}

const profiles = (state = [], action) => {
  switch (action.type) {
    case ADD_PERSON:
      return [...state, profile(action.payload)];
    default:
      return state;
  }
};

const activities = (state = {}, action) => {
  switch (action.type) {
    case ADD_PERSON:
      return {...state, [action.payload.id]: { type: 'idle' }};
    case SWITCH_ACTIVITY:
      return {...state, [action.payload.personId]: action.payload.activity };
    default:
      return state;
  }
};

export default combineReducers({ profiles, activities });