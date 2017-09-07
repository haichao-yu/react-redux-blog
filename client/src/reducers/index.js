import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  form: formReducer,  // the form property of state is going to be produced by ReduxForm reducer
  auth: authReducer,
});

export default rootReducer;