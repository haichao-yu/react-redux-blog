import React, { Component } from 'react';
import { connect } from 'react-redux';

import NoMatch from '../../nomatch';
import PostBody from './post_body';
import Comments from './comments';
import CommentNew from './comment_new';

import { fetchPost, checkAuthority } from '../../../actions';

class PostDetail extends Component {

  constructor(props) {
    super(props);
    // component state: being read or being edited
  }

  componentDidMount() {

    // Get post id
    const { id } = this.props.match.params;

    // Fetch post detail
    if (!this.props.post) {
      this.props.fetchPost(id);
    }

    // Check whether current authenticated user has authority to make change to this post
    this.props.checkAuthority(id);
  }

  renderUpdateAndDeleteButton() {
    if (this.props.allowChange) {
      return (
        <div>
          <button className="btn btn-primary mr-1">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      );
    }
  }

  render() {

    // If there is no post match the given post ID, render NoMatch page
    if (!this.props.post) {
      return <NoMatch />;
    }

    return (
      <div  className="post">
        <PostBody post={this.props.post} />
        {this.renderUpdateAndDeleteButton()}
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

function mapStateToProps({ posts, auth }, ownProps) {
  return {
    post: posts[ownProps.match.params.id],
    allowChange: auth.allowChange,
  };
}

export default connect(mapStateToProps, { fetchPost, checkAuthority })(PostDetail);