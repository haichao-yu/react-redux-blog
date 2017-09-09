import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  FETCH_MESSAGE,

  FETCH_PROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
} from './types';

const ROOT_URL = '/api';

/**
 * Authentication
 */

export function signinUser({ email, password }, historyPush, historyReplace) {

  // Using redux-thunk (instead of returning an object, return a function)
  // All redux-thunk doing is giving us arbitrary access to the dispatch function, and allow us to dispatch our own actions at any time we want
  return function(dispatch) {

    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })  // axios returns a promise
      .then(response => {  // If request is good (sign in succeeded) ...

        // - Save the JWT token (use local storage)
        localStorage.setItem('token', response.data.token);

        // - Update state to indicate user is authenticated
        dispatch({
          type: AUTH_USER,
          payload: response.data.username,
        });

        // - Redirect (PUSH) to the route '/feature'
        historyPush('/feature');
      })
      .catch(() => {  // If request is bad (sign in failed) ...

        // - Redirect (REPLACE) to the route '/signin', then show an error to the user
        historyReplace('/signin', { message: 'The email and/or password are incorrect.' });
      });
  }
}

export function signupUser({ email, password, firstName, lastName }, historyPush, historyReplace) {

  return function(dispatch) {

    axios.post(`${ROOT_URL}/signup`, { email, password, firstName, lastName })  // axios returns a promise
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
  return { type: UNAUTH_USER };
}

export function verifyJwt() {

  return function(dispatch) {
    axios.get(`${ROOT_URL}/verify_jwt`, {
      headers: { authorization: localStorage.getItem('token') }
    }).then((response) => {
      dispatch({
        type: AUTH_USER,
        payload: response.data.username,
      });
    });
  }
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

/**
 * User information
 */

export function fetchProfile() {

  return function(dispatch) {
    axios.get(`${ROOT_URL}/profile`, {
      headers: { authorization: localStorage.getItem('token') }
    }).then(response => {
      dispatch({
        type: FETCH_PROFILE,
        payload: response.data.user,
      });
    });
  }
}

export function clearProfile() {
  return { type: CLEAR_PROFILE };
}

export function updateProfile({ firstName, lastName, birthday, sex, phone, address, occupation, description }, historyReplace) {

  return function(dispatch) {
    axios.put(`${ROOT_URL}/profile`, {  // req.body (2nd parameter)
        firstName,
        lastName,
        birthday,
        sex,
        phone,
        address,
        occupation,
        description,
      }, {  // header (3rd parameter)
        headers: {authorization: localStorage.getItem('token')},  // require auth
      }
    )
      .then((response) => {  // update profile success
        // - update profile
        dispatch({
          type: UPDATE_PROFILE,
          payload: response.data.user,
        });
        // - update username for header
        dispatch({
          type: AUTH_USER,
          payload: response.data.user.firstName + ' ' + response.data.user.lastName,
        });
        // history.replace
        historyReplace('/profile', { status: 'success', message: 'You have successfully updated your profile.' });
      })
      .catch(() => { // update profile failed
        historyReplace('/profile', { status: 'fail', message: 'Update profile failed. Please try again.' });
      });
  }
}

/**
 * Blog
 */