import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';
import UploadVideo from './UploadVideo';
import MyVideosPage from './MyVideos';
import withAuthentication from './Session/withAuthentication';
import MapPage from './Maps'
import * as routes from '../constants/routes';


const App = () =>
  <BrowserRouter>
    <div className="app">

      <hr />
      <Switch>
        <Route exact path={routes.HOME} component={() => <HomePage />} />
        <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
        <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
        <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
        <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
        <Route exact path={routes.ADDVIDEO} component={() => <UploadVideo />} />
        <Route exact path={routes.MYVIDEOS} component={() => <MyVideosPage />} />
        <Route exact path={routes.MAP} component={() => <MapPage />} />
        <Redirect from="*" to="/" />
      </Switch>
      <hr />
    </div>
  </BrowserRouter>

export default withAuthentication(App);