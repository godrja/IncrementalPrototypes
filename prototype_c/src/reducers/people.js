import {ADD_PERSON} from '../actions/person';

const person = (payload) => {
  return {
    id: payload.id,
    name: payload.name
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case ADD_PERSON:
      return [...state, person(action.payload)];
    default:
      return state;
  }
}
