import { LOCATION_CHANGE } from '../actions/actionTypes';

export default function routeReducer (state = null, action) {
  return action.type === LOCATION_CHANGE ? action.payload : state;
}
