import {UPDATE_ITEM_COUNT} from "../actions/storage";
import {withDefault} from "../utils";
import {combineReducers} from "redux";

const newItem = (itemId, count) => ({ id: itemId, count });

const byId = (state = {}, action) => {
  const {type, payload} = action;

  switch (type) {
    case UPDATE_ITEM_COUNT:
      const {itemId, count} = payload;
      return { ...state, [itemId]: newItem(itemId, withDefault({count: 0})(state[itemId]).count + count) };
    default: return state;
  }
};

const allIds = (state = [], action) => {
  const {type, payload} = action;
  switch (type) {
    case UPDATE_ITEM_COUNT: {
      const {itemId} = payload;
      if (state.includes(itemId)) {
        return state
      } else {
        return [ ...state, itemId]
      }
    }
    default: return state;
  }
};

export default combineReducers({ byId, allIds });