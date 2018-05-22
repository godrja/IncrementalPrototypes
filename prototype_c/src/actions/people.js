export const ADD_PERSON = 'TYPE_PERSON_ADD';
export const SWITCH_ACTIVITY = 'TYPE_PERSON_SWITCH_ACTIVITY';

export function addPerson(id, name) {
  return {
    doLog: true,
    type: ADD_PERSON,
    payload: {id, name}
  }
}

/**
 * Switch activity of a person
 * @param {string} personId Id of the person who's activity has to be updated
 * @param {string} activityType Type of the activity ("idle", "gathering", etc.)
 * @returns {{type: *}}
 */
export function switchActivity(personId, activityType) {
  return {type: SWITCH_ACTIVITY, payload: {personId, activityType}}
}
