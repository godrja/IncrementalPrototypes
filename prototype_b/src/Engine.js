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

      if (timestamp - lastTick >= 100) {
        callback();
        lastTick = timestamp;
      }
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick)
  }

}

export default Engine;
