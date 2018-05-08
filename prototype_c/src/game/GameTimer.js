const startTicking = (callback, interval = 100) => {
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
};

export default { startTicking }
