/**
 * Start timer that will generate a tick every interval milliseconds
 * @param {function} callback function to call every tick
 * @param {number} interval Interval in milliseconds
 * @returns {{startTicking: startTicking, stopTicking: stopTicking}}
 */
function startTicking(callback, interval = 100) {
  const intervalId = setInterval(() => {
    // TODO: Make sure that if the interval is longer than (interval * 2) - 1 then multiple tick events get triggered
    callback();
  }, interval);
  return {
    startTicking: () => { throw new Error('GameTimer is already ticking') },
    stopTicking: () => {
      clearInterval(intervalId);
    }
  }
}

export default { startTicking }
