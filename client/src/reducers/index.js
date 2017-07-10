import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  form: form,  // the form property of state is going to be produced by ReduxForm reducer
  auth: authReducer,
});

export default rootReducer;