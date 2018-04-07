import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Header, Form, Input, Message, Button } from 'semantic-ui-react';


import { auth } from '../firebase';
import * as routes from '../constants/routes';

const PasswordForgetPage = () =>
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error.message));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <Segment size="large">
        <Header>Reset Password!</Header>
        <Form onSubmit={this.onSubmit} error={!!error}>
          <Form.Field>
            <Input
              value={this.state.email}
              onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
              label="Email Address"
              labelPosition="left"
              fluid
            />
          </Form.Field>
          <Message error header="Oops!" content={error} />
          <Button primary disabled={isInvalid}>
            Reset My Password
          </Button>
        </Form>
      </Segment>
    );
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
