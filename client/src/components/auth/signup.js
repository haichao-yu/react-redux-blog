import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';  // read new version of ReduxForm
import { signupUser } from '../../actions';

class Signup extends Component {

  componentWillMount() {
    if (this.props.authenticated) {
      this.props.history.replace('/');
    }
  }

  handleFormSubmit({ email, password }) {
    // Call action creator to sign up the user
    this.props.signupUser({ email, password }, (path, state) => {  // callback 1: history push
      this.props.history.push(path, state);
    }, (path, state) => {  // callback 2: history replace
      this.props.history.replace(path, state);
    });
  }

  renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <fieldset className="form-group">
      { /*<label>{label}</label>*/ }
      <input className="form-control" placeholder={label} {...input} type={type}/>
      { touched && error && <span className="text-danger">{error}</span> }
    </fieldset>
  );

  renderAlert() {

    const { state } = this.props.history.location;
    const { action } = this.props.history;

    // message: sign up failed
    if (state && action === 'REPLACE') {
      return (
        <div className="alert alert-danger alert-dismissible fade show">
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>Oops!</strong> {state.message}
        </div>
      );
    }
  }

  render() {

    const { handleSubmit } = this.props;

    return (
      <div>
        {this.renderAlert()}
        <form className="form-signin" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <h3>Sign Up</h3>
          <hr />
          <Field name="email" component={this.renderField} type="email" label="Email"/>
          <Field name="password" component={this.renderField} type="password" label="Password"/>
          <Field name="passwordConfirm" component={this.renderField} type="password" label="Confirm Password"/>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      </div>
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

Signup = reduxForm({
  form: 'signup',
  validate: validate
})(Signup);

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, { signupUser })(Signup);