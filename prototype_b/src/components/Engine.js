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

export default Engine;
