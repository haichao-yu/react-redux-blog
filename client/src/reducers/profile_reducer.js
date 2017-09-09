import {
  FETCH_PROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
} from '../actions/types';

export default function(state={}, action) {
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