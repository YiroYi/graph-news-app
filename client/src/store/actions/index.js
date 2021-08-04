import * as api from '../../api/index';

export const signupUser = (userData) => ({
  type: 'AUTH_USER',
  payload: api.signupUser(userData)
});
