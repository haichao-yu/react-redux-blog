import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { updatePost } from '../../../actions';

class PostEdit extends Component {

  componentDidMount() {
    const { content } = this.props.post;
    document.querySelector("trix-editor").value = content;
  }

  handleFormSubmit({ title, categories, content }) {

    const _id = this.props.post._id;
    categories = categories.toString();

    this.props.updatePost({ _id, title, categories, content }, this.props.onEditSuccess, (path, state) => {
      this.props.history.replace(path, state);
    });
  }

  renderInput = (field) => (
    <fieldset className="form-group">
      <label>{field.label}</label>
      <input
        className="form-control"
        {...field.input}
        type={field.type}
        placeholder={field.placeholder}
        required={field.required? 'required' : ''}
        disabled={field.disabled? 'disabled' : ''}
      />
    </fieldset>
  );

  renderTextEditor = (field) => (
    <fieldset className="form-group">
      <label>{field.label}</label>
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
      <div className="post">
        {this.renderAlert()}
        <h2 className="mb-5">Edit Your Post</h2>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="title" component={this.renderInput} type="text" label="Title:" placeholder="Enter your title" required={true} />
          <Field name="categories" component={this.renderInput} type="text" label="Categories:" placeholder="Enter your categories, use ',' to separate them" required={true} />
          <Field name="content" component={this.renderTextEditor} label="Content:" />
          <button action="submit" className="btn btn-primary">Publish</button>
        </form>
      </div>
    );
  }
}

PostEdit = reduxForm({
  form: 'post_edit',  // name of the form
})(PostEdit);

function mapStateToProps(state, ownProps) {
  return { initialValues: ownProps.post };
}

export default connect(mapStateToProps, { updatePost })(PostEdit);