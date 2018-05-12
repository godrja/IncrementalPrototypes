import check from 'check-types';

export const ADD_ACTIVITY = 'TYPE_ACTIVITY_ADD';
export const PROGRESS_ACTIVITY = 'TYPE_ACTIVITY_PROGRESS';
export const RESET_ACTIVITY = 'TYPE_ACTIVITY_RESET';

/**
 * @param {string} type Activity type
 * @param peopleIds array Array of people ids that should be assigned to this job
 * @returns {{type: string, doLog: boolean, payload: {type: *, peopleIds: *}}}
 */
export function addActivity(type, peopleIds) {
  check.assert.array(peopleIds);
  return {
    type: ADD_ACTIVITY, doLog: true, payload: {type, peopleIds}
  }
}

export function progressActivity(activityId, units = 1) {
  return {type: PROGRESS_ACTIVITY, payload: {activityId: activityId, units}}
}

export function resetActivity(activityId) {
  return {type: RESET_ACTIVITY, payload: {activityId: activityId}}
}
