import { GAME_TICK } from '../actions'

export default function (state = 0, action) {
  switch (action.type) {
    case GAME_TICK:
      return state + 1;
    default:
      return state;
  }
}
