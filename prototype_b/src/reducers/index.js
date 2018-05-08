import { combineReducers } from 'redux'
import perf from './perf.js'
import tick from './tick.js'

export default combineReducers({ tick, perf })
