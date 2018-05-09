import { ADD_PERSON } from '../actions/person.js';

// const spawnPeople = () => ({name: 'Fyodor Ignatyevitch'});
// const defaultPeople = [spawnPeople()];

export default (state = [], action) => {
  switch (action.type) {
    case ADD_PERSON:
      return [...state, action.person];
    default:
      return state;
  }
}
