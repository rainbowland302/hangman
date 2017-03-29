import * as type from './actionTypes';

function locationChange (location = '/') {
  return {
    type    : type.LOCATION_CHANGE,
    payload : location
  };
}

export const updateLocation = ({ dispatch }) => {
  return (nextLocation) => dispatch(locationChange(nextLocation));
};
