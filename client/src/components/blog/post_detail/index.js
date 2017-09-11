import React, { Component } from 'react';
import { connect } from 'react-redux';

import NoMatch from '../../nomatch';
import PostBody from './post_body';
import Comments from './comments';
import CommentNew from './comment_new';
import PostEdit from './post_edit';

import { fetchPost, checkAuthority, deletePost } from '../../../actions';

class PostDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {  // component state: being read or being edited
      beingEdit: false
    };
  }

  componentDidMount() {

    // By default, we set beingEdit as false (Since when the user first click the post, the post detail is read, rather than edited)
    this.setState({
      beingEdit: false
    });

    // Get post id
    const { id } = this.props.match.params;

    // Fetch post detail
    if (!this.props.post) {
      this.props.fetchPost(id);
    }

    // Check whether current authenticated user has authority to make change to this post
    this.props.checkAuthority(id);
  }

  handleEditSuccess() {
    this.setState({
      beingEdit: false
    });
  }

  onEditClick() {
    this.setState({
      beingEdit: true
    });
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, (path) => {
      this.props.history.push(path);
    });
  }

  renderDeleteConfirmModal() {  // used for delete confirmation
    return (
      <div className="modal fade" id="deleteConfirmModal" tabIndex="-1" role="dialog" aria-labelledby="deleteConfirmModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteConfirmModalLabel">Confirm Delete</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this post with its comments? <strong>Attention!</strong> This delete operation cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.onDeleteClick.bind(this)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderUpdateAndDeleteButton() {
    if (this.props.allowChange) {
      return (
        <div>
          <button className="btn btn-primary mr-1" onClick={this.onEditClick.bind(this)}>Edit</button>
          <button className="btn btn-danger" data-toggle="modal" data-target="#deleteConfirmModal">Delete</button>
        </div>
      );
    }
  }

  render() {

    // If there is no post match the given post ID, render NoMatch page
    if (!this.props.post) {
      return <NoMatch />;
    }

    // If the component state 'beingEdit' is true, we render the post edit page
    if (this.state.beingEdit) {
      return (
        <PostEdit
          post={this.props.post}
          onEditSuccess={this.handleEditSuccess.bind(this)}
          history={this.props.history}
          state={this.props.history.location.state}
          action={this.props.history.action}
        />
      );
    }

    // Render the regular post detail page for reading
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

        {this.renderDeleteConfirmModal()}

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

export default connect(mapStateToProps, { fetchPost, checkAuthority, deletePost })(PostDetail);