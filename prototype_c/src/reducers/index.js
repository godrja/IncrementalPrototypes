import { combineReducers } from 'redux'
import tick from './tick'
import people from "./people";
import jobs from "./jobs"

export default combineReducers({ tick, people, jobs })