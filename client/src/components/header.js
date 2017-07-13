import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signoutUser } from '../actions';

class Header extends Component {

  renderLinks() {
    if (this.props.authenticated) {
      // show a link to sign out
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={this.props.signoutUser}>Sign Out</Link>
        </li>
      );
    } else {
      // show a link to sign in or sign up
      return [  // react feature: allow us to return an array of components
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <div className="navbar navbar-toggleable-md navbar-light bg-faded" >
        <Link to="/" className="navbar-brand">Redux Auth</Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="nav-item mr-auto">
            <Link to="/" className="nav-link">Home</Link>
          </div>
          <ul className="nav navbar-nav">
            {this.renderLinks()}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, { signoutUser })(Header);