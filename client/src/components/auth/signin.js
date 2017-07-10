import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { signinUser } from '../../actions';

class Signin extends Component {

  handleFormSubmit({ email, password }) {
    // console.log(email, password);
    // need to do something to log user in
    this.props.signinUser({ email, password }, (path) => {
      this.props.history.push(path);
    });
  }

  renderField = (field) => (
    <fieldset className="form-group">
      <label>{field.label}</label>
      <input className="form-control" {...field.input} type={field.type}/>
    </fieldset>
  );

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {

    // these properties comes from ReduxForm
    const { handleSubmit } = this.props;

    // when do we need .bind(this)?
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" component={this.renderField} type="email" label="Email:" />
        <Field name="password" component={this.renderField} type="password" label="Password:" />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signin = reduxForm({
  form: 'signin',  // name of the form
})(Signin);

export default connect(mapStateToProps, { signinUser })(Signin);

// The new version of reduxForm also removes the ability to inject actions or props like the 'connect' helper from React Redux does.
// To fix this, you'll need to wrap your component with both the 'connect' and 'reduxForm' helpers.