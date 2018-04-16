import {
  FETCH_PROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
} from '../actions/types';

export default function(state={}, action) {
  // Attention!!! The state object here refers to state.profile, instead of the application state.

  switch(action.type) {
    case FETCH_PROFILE:
      return { ...state, user: action.payload };
    case CLEAR_PROFILE:  // clear the local redux state
      return {};
    case UPDATE_PROFILE:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}