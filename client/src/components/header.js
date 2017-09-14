import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { verifyJwt, signoutUser } from '../actions';

class Header extends Component {

  componentWillMount() {
    if (this.props.authenticated && !this.props.user) {
      this.props.verifyJwt();  // fetch username
    }
  }

  renderLinks() {
    if (this.props.authenticated) {
      // show a dropdown menu for authenticated user
      return (
        <div className="navbar-nav nav-item dropdown ml-auto">
          <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.username}</a>
          <div className="dropdown-menu" aria-labelledby="dropdown02">
            <Link className="dropdown-item" to="/my_posts">Your Posts</Link>
            <Link className="dropdown-item" to="/profile">Your Profile</Link>
            <div className="dropdown-divider" />
            <Link className="dropdown-item" to="/settings">Settings</Link>
            <Link className="dropdown-item" to="/" onClick={this.props.signoutUser}>Sign out</Link>
          </div>
        </div>
      );
    } else {
      // show a link to sign in or sign up
      return (
        <ul className="navbar-nav">
          <li className="nav-item" key={1}>
            <Link className="btn btn-primary" to="/signup">Sign Up</Link>
          </li>
          <li className="nav-item" key={2}>
            <Link className="btn btn-secondary ml-sm-2" to="/signin">Sign In</Link>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <nav className="navbar navbar-inverse bg-inverse navbar-toggleable-md fixed-top">
        <div className="container">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleContainer" aria-controls="navbarsExampleContainer" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <Link className="navbar-brand" to="/">Haichao's Blog System</Link>

          <div className="collapse navbar-collapse" id="navbarsExampleContainer">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/posts">Posts</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" target="_blank" rel="noopener noreferrer" href="https://github.com/haichao-yu/react-redux-blog">GitHub</a>
              </li>
            </ul>
            <form className="form-inline my-2 my-md-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search Post" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <div className="ml-auto">
              {this.renderLinks()}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    username: state.auth.username,
  };
}

export default connect(mapStateToProps, { verifyJwt, signoutUser })(Header);



/**
 * todo: A bug need to be fixed - After updating user profile, you navigate to another page (i.e., www.google.com). If you click the go back button on the browser, the username on header is incorrect.
 */