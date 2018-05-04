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

}

export default Engine;
