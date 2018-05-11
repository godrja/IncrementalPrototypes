import check from 'check-types';

export const ADD_JOB = 'TYPE_JOB_ADD';
export const PROGRESS_JOB = 'TYPE_JOB_PROGRESS';
export const RESET_JOB = 'TYPE_JOB_RESET';

/**
 * @param type string Job type
 * @param peopleIds array Array of people ids that should be assigned to this job
 * @returns {{type: string, doLog: boolean, payload: {type: *, peopleIds: *}}}
 */
export function addJob(type, peopleIds) {
  check.assert.array(peopleIds);
  return {
    type: ADD_JOB, doLog: true, payload: {type, peopleIds}
  }
}

export function progressJob(jobId, units = 1) {
  return {type: PROGRESS_JOB, payload: {jobId, units}}
}

export function resetJob(jobId) {
  return {type: RESET_JOB, payload: {jobId}}
}
