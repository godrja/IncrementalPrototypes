export const ADD_PERSON = 'TYPE_PERSON_ADD';

export function addPerson(person) {
  return { type: ADD_PERSON, person }
}