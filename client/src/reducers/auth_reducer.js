import {
  AUTH_USER,
  UNAUTH_USER,

  CHECK_AUTHORITY,
} from '../actions/types';

export default function(state = {}, action) {
  // Attention!!! The state object here refers to state.auth, instead of the application state.

  switch(action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, username: action.payload };
    case UNAUTH_USER:
      return { ...state, authenticated: false, username: '' };

    case CHECK_AUTHORITY:  // check if the user has the authority to make change to a specific post
      return { ...state, allowChange: action.payload };

    default:
      return state;
  }
}