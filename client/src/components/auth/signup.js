import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';  // read new version of ReduxForm
import { signupUser } from '../../actions';

class Signup extends Component {

  handleFormSubmit({ email, password }) {
    // Call action creator to sign up the user
    this.props.signupUser({ email, password }, (path) => {
      this.props.history.push(path);
    });
  }

  renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <fieldset className="form-group">
      <label htmlFor={input.name}>{label}</label>
      <input className="form-control" {...input} type={type}/>
      { touched && error && <span className="text-danger">{error}</span> }
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

    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" component={this.renderField} type="email" label="Email:"/>
        <Field name="password" component={this.renderField} type="password" label="Password:"/>
        <Field name="passwordConfirm" component={this.renderField} type="password" label="Confirm Password:"/>
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function validate(formProps) {

  // console.log(formProps);

  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter an password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter an password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Password must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signup = reduxForm({
  form: 'signup',
  validate: validate
})(Signup);

export default connect(mapStateToProps, { signupUser })(Signup);