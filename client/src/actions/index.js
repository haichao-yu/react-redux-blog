import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }, callback) {

  // Using redux-thunk (instead of returning an object, return a function)
  // All redux-thunk doing is giving us arbitrary access to the dispatch function, and allow us to dispatch our own actions at any time we want
  return function(dispatch) {

    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })  // axios returns a promise
      .then(response => {
        // If request is good...

        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });

        // - Save the JWT token (using local storage)
        localStorage.setItem('token', response.data.token);

        // - redirect to the route '/feature'
        callback('/feature');
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'))
      });
  }
}

export function signupUser({ email, password }, callback) {

  // Similar to signinUser()
  return function(dispatch) {

    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        callback('/feature');
      })
      .catch(({response}) => dispatch(authError(response.data.error)));  // https://github.com/mzabriskie/axios/pull/345
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function signoutUser() {

  // - Delete the JWT token from local storage
  localStorage.removeItem('token');

  // - Update state to indicate the user is not authenticated
  return { type: UNAUTH_USER }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    }).then(response => {
      // console.log(response);
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message,
      });
    });
  }
}