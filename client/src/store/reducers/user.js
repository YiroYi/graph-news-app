export default function(state={}, action) {
  switch(action.type) {
    case 'AUTH_USER':
      console.log(action.payload);
      return {...state, ...action.payload}

    default:
      return state;
  }
}
