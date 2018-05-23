function actionsToNextState(actions, rootReducer, initialState) {
  return actions.reduce(rootReducer, initialState);
}

function nextState(rules, initialState, rootReducer) {
  return rules.reduce(
    (state, rule) =>
      actionsToNextState(
        rule(state),
        rootReducer,
        initialState),
    initialState
  )
}

export {nextState};