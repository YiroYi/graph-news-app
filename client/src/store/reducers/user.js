export default function (state = {}, action) {
  switch (action.type) {
    case "AUTH_USER":
      return { ...state, ...action.payload };
    case "LOGIN_USER":
      return { ...state, ...action.payload };
    case "SIGN_IN":
      return { ...state, ...action.payload };

    case "LOGOUT":
      return { auth: action.payload };

    case "USER_STATS":
      return { ...state, ...action.payload };
    case "CREATE_POST":
      return { ...state, ...action.payload };

    case "USER_POSTS":
      return { ...state, ...action.payload };

    case "UPDATE_POST":
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
