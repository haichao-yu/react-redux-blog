import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from '../../actions';

class Signout extends Component {

  componentWillMount() {
    // Whenver a user visits this route, this user will be logged out
    this.props.signoutUser();
  }

  render() {
    return (
      <div>Sorry to see you go...</div>
    );
  }
}

export default connect(null, { signoutUser })(Signout);