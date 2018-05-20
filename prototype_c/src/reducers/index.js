import { combineReducers } from 'redux'
import tick from './tick'
import people from './people';
import storage from "./storage";

export default combineReducers({ tick, people, storage })