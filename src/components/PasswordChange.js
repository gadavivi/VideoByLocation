import React, { Component } from 'react';
import { Segment, Header, Form, Input, Message, Button } from 'semantic-ui-react';

import { auth } from '../firebase';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      <Segment>
        <Header>Change Password!</Header>
        <Form onSubmit={this.onSubmit} error={!!error}>
          <Form.Field>
            <Input
              value={passwordOne}
              onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
              type="password"
              label="New Password"
              labelPosition="left"
              fluid
            />
          </Form.Field>
          <Form.Field>
            <Input
              value={passwordTwo}
              onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
              type="password"
              label="Confirm"
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

export default PasswordChangeForm;