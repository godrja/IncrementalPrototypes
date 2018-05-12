import { combineReducers } from 'redux'
import tick from './tick'
import people from "./people";
import activities from "./activities"

export default combineReducers({ tick, people, activities })