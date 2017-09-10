import _ from 'lodash';
import {
  CREATE_COMMENT,
  FETCH_COMMENTS,
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_COMMENTS:
      return _.mapKeys(action.payload, '_id');
    case CREATE_COMMENT:
      return { [action.payload._id]: action.payload, ...state };  // [] here is not for creating array, is for key interpolation, i.e. newState[action.payload.id] = action.payload
    default:
      return state;
  }
}