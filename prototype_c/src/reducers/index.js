import { combineReducers } from 'redux'
import tick from './tick.js'
import people from "./people";

export default combineReducers({ tick, people })