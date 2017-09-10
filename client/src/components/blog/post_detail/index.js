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
        <Comments postId={this.props.match.params.id} />
        <CommentNew
          postId={this.props.match.params.id}
          history={this.props.history}
          state={this.props.history.location.state}
          action={this.props.history.action}
        />
      </div>
    );
  }
}

export default connect()(PostDetail);