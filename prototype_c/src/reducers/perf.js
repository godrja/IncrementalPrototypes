import { GAME_TICK } from '../actions';

const perfReducer = (state, action) => {
  if (!state) {
    state = {
      byTimeout: {
        money: 0, expectedMoney: 0, startTime: undefined
      },
      byInterval: {
        money: 0, expectedMoney: 0, startTime: undefined
      },
      byAnimationFrame: {
        money: 0, expectedMoney: 0, startTime: undefined
      }
    }
  }
  switch (action.type) {
    case GAME_TICK:
      const sliceState = state[action.sliceName];
      const newSlice = {
        [action.sliceName]: {
          startTime: sliceState.startTime ? sliceState.startTime : Date.now(),
          money: sliceState.money + 1,
          expectedMoney: Math.round((Date.now() - sliceState.startTime) / 100 + 1),
        }
      }
      return Object.assign({}, state, newSlice);
    default:
      return state;
  }
}

export default perfReducer;
