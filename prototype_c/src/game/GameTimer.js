import { GAME_TICK } from '../actions'

const startTicking = (store) => {
  const intervalId = setInterval(() => {
    store.dispatch({ type: GAME_TICK });
  }, 100);
  return {
    startTicking: () => { throw new Error('GameTimer is already ticking') },
    stopTicking: () => {
      clearInterval(intervalId);
    }
  }
};

export default { startTicking }
