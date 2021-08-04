import * as api from '../../api/index';

export const signupUser = userData => ({
  type: 'AUTH_USER',
  payload: api.signupUser(userData)
});

export const loginUser = userData => ({
  type: 'LOGIN_USER',
  payload: api.loginUser(userData)
});
