import perfReducer from './perf.js'

export default (state, action) => {
  switch (action.type) {
    default:
      return {
        'perf': perfReducer(state, action)
      }
  }
}
