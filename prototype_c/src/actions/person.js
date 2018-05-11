export const ADD_PERSON = 'TYPE_PERSON_ADD';

let personSeq = 0;

const personId = (firstName) => (firstName.toLowerCase() + '_' + personSeq);
const personName = (firstName, lastName) => (firstName + ' '  + lastName);

export function addPerson(firstName, lastName) {
  return {
    type: ADD_PERSON, doLog: true, payload: {
      id: personId(firstName),
      name: personName(firstName, lastName)
    }
  }
}
