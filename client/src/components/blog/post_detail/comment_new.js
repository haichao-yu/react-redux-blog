import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createComment } from '../../../actions';

class CommentNew extends Component {

  handleFormSubmit({ comment }) {
    const postId = this.props.postId;
    this.props.createComment({ comment, postId }, () => {  // callback 1: clear text editor
      document.querySelector("trix-editor").value = ""
    }, (path, state) => {  // callback 2: history replace
        this.props.history.replace(path, state);
    });
  }

  renderTextEditor = (field) => (
    <fieldset className="form-group">
      <input className="form-control" id="x" type="hidden" name="content" />
      <trix-editor input="x" {...field.input} />
    </fieldset>
  );

  renderAlert() {

    const { state } = this.props;
    const { action } = this.props;

    if (state && action === 'REPLACE') {
      return (
        <div className="alert alert-danger" role="alert">
          {`[${state.time}] --- `} <strong>Oops!</strong> {state.message}
        </div>
      );
    }
  }

  render() {

    const { handleSubmit } = this.props;

    return (
      <div>
        <h3 className="mt-5 mb-4">New Comment</h3>
        {this.renderAlert()}
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="comment" component={this.renderTextEditor} />
          <button action="submit" className="btn btn-primary">Post Your Comment</button>
        </form>
      </div>
    );
  }
}

CommentNew = reduxForm({
  form: 'comment_new',  // name of the form
})(CommentNew);

export default connect(null, { createComment })(CommentNew);