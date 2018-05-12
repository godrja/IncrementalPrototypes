import {ADD_ACTIVITY, PROGRESS_ACTIVITY, RESET_ACTIVITY} from "../actions/activities";

function updateActivity(activityId, state, update) {
  return state.map((activity) => (
    activity.id === activityId ? Object.assign({}, activity, update(activity)) : activity
  ));
}

let activityIdSeq = 0;

function nextActivityId() {
  return activityIdSeq++;
}

export default function (state = [], action) {
  if (!action) return state;

  switch (action.type) {
    case ADD_ACTIVITY:
      return [...state, {id: nextActivityId(), type: action.payload.type, done: 0, personId: action.payload.personId}];
    case PROGRESS_ACTIVITY:
      return updateActivity(action.payload.activityId, state, activity => ({done: activity.done + action.payload.units}));
    case RESET_ACTIVITY:
      return updateActivity(action.payload.activityId, state, () => ({done: 0}));
    default:
      return state;
  }
}