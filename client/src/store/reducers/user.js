export default function(state={}, action) {
  switch(action.type) {
    case 'AUTH_USER':
      return {...state, ...action.payload}
    case 'LOGIN_USER':
      return {...state, ...action.payload}
    case 'SIGN_IN':
       return {...state, ...action.payload}

    case 'LOGOUT':
       return {...state, ...action.payload}
    default:
      return state;
  }
}
