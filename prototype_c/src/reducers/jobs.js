import {ADD_JOB, PROGRESS_JOB, RESET_JOB} from "../actions/jobs";

function updateJob(jobId, state, update) {
  return state.map((job) => (
    job.id === jobId ? Object.assign({}, job, update(job)) : job
  ));
}

let jobIdSeq = 0;

function nextJobId() {
  return jobIdSeq++;
}

export default function (state = [], action) {
  if (!action) return state;

  switch (action.type) {
    case ADD_JOB:
      return [...state, {id: nextJobId(), type: action.payload.type, done: 0, peopleIds: action.payload.peopleIds}];
    case PROGRESS_JOB:
      return updateJob(action.payload.jobId, state, job => ({done: job.done + action.payload.units}));
    case RESET_JOB:
      return updateJob(action.payload.jobId, state, () => ({done: 0}));
    default:
      return state;
  }
}