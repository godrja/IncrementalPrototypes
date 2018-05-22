import {ADD_PERSON, SWITCH_ACTIVITY} from '../actions/people';
import {combineReducers} from "redux";

const createActivity = (type = "idle") => ({type});
const createPerson = (id, name, activity = createActivity()) => ({id, name, activity});

const personReducer = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case ADD_PERSON: {
      const {id, name} = payload;
      return createPerson(id, name);
    }
    case SWITCH_ACTIVITY: {
      const {activityType} = payload;
      return {...state, activity: createActivity(activityType)}
    }
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  const {type, payload} = action;

  switch (type) {
    case ADD_PERSON: {
      const {id} = payload;
      return {...state, [id]: personReducer({}, action)};
    }
    case SWITCH_ACTIVITY: {
      const {personId} = payload;
      return {...state, [personId]: personReducer(state[personId], action) };
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  const {type, payload} = action;
  switch (type) {
    case ADD_PERSON:
      const {id} = payload;
      return [...state, id];
    default:
      return state;
  }
};

export default combineReducers({byId, allIds});