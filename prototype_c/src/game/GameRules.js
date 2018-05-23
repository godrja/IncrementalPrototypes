function nextState(rules, initialState, rootReducer) {
  const nextStateForActions = (actions, initialState) =>
    actions.reduce((state, action) => rootReducer(state, action), initialState);
  const nextStateForRules = () =>
    rules.reduce((state, fn) => nextStateForActions(fn(state), state), initialState)

  return rules.reduce((state, fn) => nextStateForActions(fn(state), state), initialState);
}

export {nextState};