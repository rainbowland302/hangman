import { combineReducers } from 'redux';

import createReducer from '../reducers/reducer';
/**
 * Inject an asynchronously loaded reducer
 */
export const injectReducer = (store, { key, reducer }) => {
  //if (Reflect.has(store.asyncReducers, key)) return;
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
};
