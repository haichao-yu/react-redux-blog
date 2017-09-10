import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  } from '../../../actions';

class CommentNew extends Component {

  render() {
    return (
      <div>
        <h3>New Comment</h3>
      </div>
    );
  }
}

export default connect()(CommentNew);