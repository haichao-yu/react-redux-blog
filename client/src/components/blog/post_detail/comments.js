import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  } from '../../../actions';

class Comments extends Component {

  render() {
    return (
      <div>
        <h3>Comments</h3>
        <hr />
      </div>
    );
  }
}

export default connect()(Comments);