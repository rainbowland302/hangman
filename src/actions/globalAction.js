import { createAction } from 'redux-actions';

import * as type from './actionTypes';

export const editEmail = createAction(type.EDIT_EMAIL, email => {
  const payload = {
    email: email,
    action: type.EDIT_EMAIL
  };
  return payload;
});
