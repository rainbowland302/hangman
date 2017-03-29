import { injectReducer } from './utils/asyncInjectors';

export const createRoutes = (store) => {
  return [{
    path: '/',
    name: 'game',
    getComponent(nextState, cb) {
      /*  Webpack - use 'require.ensure' to create a split point
          and embed an async module loader (jsonp) when bundling   */
      require.ensure([], (require) => {
        /*  Webpack - use require callback to define
            dependencies for bundling   */
        const component = require('./containers/GameContainer').default;
        const reducer = require('./reducers/gameReducer').default;

        /*  Add the reducer to the store on key 'game'  */
        injectReducer(store, { key: 'game', reducer });

        /*  Return getComponent   */
        cb(null, component);

        /* Webpack named bundle   */
      }, 'game');
    }
  }]
};

export default createRoutes;
