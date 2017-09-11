import {
  AUTH_USER,
  UNAUTH_USER,
  FETCH_MESSAGE,

  CHECK_AUTHORITY,
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, username: action.payload };
    case UNAUTH_USER:
      return { ...state, authenticated: false, username: '' };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    case CHECK_AUTHORITY:
      return { ...state, allowChange: action.payload };
    default:
      return state;
  }
}