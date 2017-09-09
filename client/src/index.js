import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import Header from './components/header';
import Footer from './components/footer';
import NoMatch from './components/nomatch';
import Welcome from './components/welcome';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Profile from './components/userinfo/profile';
import Feature from './components/feature'
import RequireAuth from './components/auth/require_auth';

import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // We need to update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        <div className="container" id="content">
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route path='/signin' component={Signin} />
            <Route path='/signup' component={Signup} />
            <Route path="/profile" component={RequireAuth(Profile)} />
            <Route path='/feature' component={RequireAuth(Feature)} />
            <Route component={NoMatch} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  </Provider>
  , document.getElementById('root')
);