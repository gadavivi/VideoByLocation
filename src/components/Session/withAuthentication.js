import React from 'react';
import { connect } from 'react-redux';

import { firebase } from '../../firebase';
import { onSetAuthUser } from '../../actions';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { onSetAuthUser } = this.props;

      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? onSetAuthUser(authUser)
          : onSetAuthUser(null);
      });
    }

    render() {
      return (
        <Component />
      );
    }
  }

  return connect(null, { onSetAuthUser })(WithAuthentication);
}

export default withAuthentication;