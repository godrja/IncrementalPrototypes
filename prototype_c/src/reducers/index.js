import { combineReducers } from 'redux'
import tick from './tick'
import people from './people';

export default combineReducers({ tick, people })