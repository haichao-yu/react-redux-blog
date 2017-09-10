import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostBody from './post_body';
import Comments from './comments';
import CommentNew from './comment_new';

class PostDetail extends Component {

  render() {
    return (
      <div  className="post-detail">
        <PostBody id={this.props.match.params.id} />
        <Comments id={this.props.match.params.id} />
        <CommentNew id={this.props.match.params.id} />
      </div>
    );
  }
}

export default connect()(PostDetail);