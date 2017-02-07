export default (store) => ({
  path: 'result',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Result = require('./components/ResultView').default
      // const reducer = require('./modules/game').default

      /*  Add the reducer to the store on key 'game'  */
      // injectReducer(store, { key: 'result', reducer })

      /*  Return getComponent   */
      cb(null, Result)

      /* Webpack named bundle   */
    }, 'result')
  }
})
