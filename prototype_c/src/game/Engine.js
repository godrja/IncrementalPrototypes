import { GAME_TICK } from '../actions'

var TICK = 100;

class Engine {
  bindClockTickByTimeout(callback) {
    function tick() {
        var now = Date.now();

        callback();

        setTimeout(tick, TICK - (now % TICK));
    }

    tick();
  }

  bindClockTickByInterval(callback) {
    setInterval(callback, 100);
  }

  bindClockTickByAnimationFrame(callback) {
    var lastTick = null;

    function tick(timestamp) {
      if (!lastTick) { lastTick = timestamp; }

      const delta = (timestamp - lastTick - 100) % 100;
      if (delta >= 0) {
        callback();
        lastTick = timestamp - delta;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

}

class GameTimer {
  /**
   * Create a GameTimer connected to a Redux store
   * @param store Redux store to dispath events to
   */
  constructor(store) {
    this.intervalId = undefined;
    this.store = store;
  }

  /**
   * Start generating TICK events
   */
  startTicking() {
    if (this.intervalId) { throw new Error('GameTimer is already ticking'); }

    this.lastTick = Date.now();
    this.intervalId = setInterval(() => this._timerTick(), 100);
  }

  stopTicking() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }

  _timerTick() {
    //TODO: Dispose multiple events if diff is more than 100ms
    this.store.dispatch({type: GAME_TICK, sliceName: 'byInterval'})
  }

}


export{ GameTimer };
export default Engine;
