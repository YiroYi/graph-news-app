import * as api from "../../api/index";

export const signupUser = (userData) => ({
  type: "AUTH_USER",
  payload: api.signupUser(userData),
});

export const loginUser = (userData) => ({
  type: "LOGIN_USER",
  payload: api.loginUser(userData),
});

export const autoSignIn = () => ({
  type: "SIGN_IN",
  payload: api.autoSignIn(),
});

export const logoutUser = () => {
  localStorage.removeItem("X-AUTH");

  return {
    type: "LOGOUT",
    payload: null
  };
};

export const updateEmailPass = (email, password, id) => ({
    type: "AUTH_USER",
    payload: api.updateEmailPass(email, password, id),
});

export const getUserStats = (id) => ({
   type: "USER_STATS",
   payload: api.getUserStats(id),
});
