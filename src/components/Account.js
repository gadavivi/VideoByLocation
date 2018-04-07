import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Header, Container } from 'semantic-ui-react';

import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './Session/withAuthorization';
import SignLayout from './SignLayout';


const AccountPage = ({ authUser }) =>
  <SignLayout>
    <Header>Account: {authUser.email}</Header>
    <PasswordForgetForm />
    <br />
    <PasswordChangeForm />
  </SignLayout>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);