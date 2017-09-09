import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { signinUser } from '../../actions';

class Signin extends Component {

  componentWillMount() {
    if (this.props.authenticated) {  // if the user already signed in, navigate to '/posts'
      this.props.history.replace('/posts');
    }
  }

  handleFormSubmit({ email, password }) {
    // console.log(email, password);
    // need to do something to log user in
    this.props.signinUser({ email, password }, (path) => {  // callback 1: history push
      this.props.history.push(path);
    }, (path, state) => {  // callback 2: history replace
      this.props.history.replace(path, state);
    });
  }

  renderField = (field) => (
    <fieldset className="form-group">
      { /*<label>{field.label}</label>*/ }
      <input className="form-control" placeholder={field.label} {...field.input} type={field.type} required='required' />
    </fieldset>
  );

  renderAlert() {

    const { state } = this.props.history.location;
    const { action } = this.props.history;

    // message: successfully signed up, you can sign in
    if (state && action === 'PUSH') {
      return (
        <div className="alert alert-success" role="alert">
          {`[${state.time}] --- `} <strong>Congratulations!</strong> {state.message}
        </div>
      );
    }

    // message: sign in failed
    if (state && action === 'REPLACE') {
      return (
        <div className="alert alert-danger" role="alert">
          {`[${state.time}] --- `} <strong>Oops!</strong> {state.message}
        </div>
      );
    }
  }

  render() {

    // these properties comes from ReduxForm
    const { handleSubmit } = this.props;

    // when do we need .bind(this)?
    return (
      <div>
        {this.renderAlert()}
        <form className="form-signin" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <h3>Sign In</h3>
          <hr />
          <Field name="email" component={this.renderField} type="email" label="Email" />
          <Field name="password" component={this.renderField} type="password" label="Password" />
          <button action="submit" className="btn btn-primary">Sign In</button>
        </form>
      </div>
    );
  }
}

Signin = reduxForm({
  form: 'signin',  // name of the form
})(Signin);

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, { signinUser })(Signin);

// The new version of reduxForm (v6) also removes the ability to inject actions or props like the 'connect' helper from React Redux does.
// To fix this, you'll need to wrap your component with both the 'connect' and 'reduxForm' helpers.