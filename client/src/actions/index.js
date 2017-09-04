import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  FETCH_MESSAGE,
} from './types';

const ROOT_URL = '/api';

export function signinUser({ email, password }, historyPush, historyReplace) {

  // Using redux-thunk (instead of returning an object, return a function)
  // All redux-thunk doing is giving us arbitrary access to the dispatch function, and allow us to dispatch our own actions at any time we want
  return function(dispatch) {

    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })  // axios returns a promise
      .then(response => {  // If request is good (sign in succeeded) ...

        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });

        // - Save the JWT token (using local storage)
        localStorage.setItem('token', response.data.token);

        // - Redirect (PUSH) to the route '/feature'
        historyPush('/feature');
      })
      .catch(() => {  // If request is bad (sign in failed) ...

        // - Redirect (REPLACE) to the route '/signin', then show an error to the user
        historyReplace('/signin', { message: 'The email and/or password are incorrect.' });
      });
  }
}

export function signupUser({ email, password }, historyPush, historyReplace) {

  return function(dispatch) {

    axios.post(`${ROOT_URL}/signup`, { email, password })  // axios returns a promise
      .then(response => {  // If request is good (sign up succeeded) ...

        // - Redirect (PUSH) to the route '/signin', then show a success message to the user
        historyPush('/signin', { message: response.data.message });
      })
      .catch(({response}) => {  // If request is bad (sign up failed) ...

        // - Redirect (REPLACE) to the route '/signup', then show an error to the user
        historyReplace('/signup', { message: response.data.message });
      });
  }
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