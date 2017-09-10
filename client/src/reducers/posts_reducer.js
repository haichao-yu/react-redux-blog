import _ from 'lodash';
import {
  FETCH_POSTS,
  CREATE_POST,
  FETCH_POST,
  UPDATE_POST,
  DELETE_POST,
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload, '_id');
    case CREATE_POST:
      return state;
    case FETCH_POST:
      return state;
    case UPDATE_POST:
      return state;
    case DELETE_POST:
      return state;
    default:
      return state;
  }
}