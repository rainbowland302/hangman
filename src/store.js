import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { browserHistory } from 'react-router';
import createReducer from './reducers/reducer';
import { updateLocation } from './actions/routeAction';
import DevTools from './containers/DevTools';

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [promise, thunk];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];

  let composeEnhancers = compose;

  if (__DEV__) {
    // const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    // if (typeof composeWithDevToolsExtension === 'function') {
    //   composeEnhancers = composeWithDevToolsExtension
    // }
    enhancers.push(DevTools.instrument());
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  // Make reducers hot reloadable
  if (module.hot) {
    module.hot.accept('./reducers/reducer', () => {
      const reducers = require('./reducers/reducer').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
}
