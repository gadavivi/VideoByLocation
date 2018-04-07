import _ from 'lodash'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Menu, Container, Grid, Message } from 'semantic-ui-react';
import Slider from 'react-rangeslider'

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
import { renderComponent } from 'recompose';
import { watchLocation, radiusUpdate, radiusUpdateComplete, updateLocation } from '../actions/index';
import LandingPage from './Landing';

class SignLayout extends Component {

  componentDidMount() {
    this.props.watchLocation({ radius: this.props.radius })
  }

  componentDidUpdate(prevProps) {
    const { coordinate, geoQuery } = this.props;
    const prevCoordinate  = prevProps.coordinate;
    if (geoQuery && (coordinate.longitude !== prevCoordinate.longitude || coordinate.latitude !== prevCoordinate.latitude)) {
      const { longitude, latitude } = coordinate;
      this.props.updateLocation({ longitude, latitude, geoQuery });
    }
  }

  render() {
    const { positionError, radius } = this.props;

    return (
      <Container>
        <Grid centered stackable>
          <Grid.Column computer={3}>
            <Link to={routes.HOME}><Button primary>Home</Button></Link>
            <Link to={routes.ACCOUNT}><Button primary>Accout</Button></Link>
          </Grid.Column>
          <Grid.Column computer={9}>
            {!positionError ?
              <Slider
                onChange={(value) => this.props.radiusUpdate({ radius: value })}
                onChangeComplete={() => this.props.radiusUpdateComplete({ radius: this.props.radius })}
                value={radius} orientation="horizontal" min={1} max={20} step={1}
                labels={{ 1: 'Low', 20: 'High' }} />
              : <Message negative header="Oops!" content={positionError} />}
          </Grid.Column>
          <Grid.Column computer={4}>
            {!positionError ? <Link to={routes.ADDVIDEO}><Button primary>+</Button></Link> : null}
            {!positionError ? <Link to={routes.MAP}><Button primary>Map</Button></Link> : null}
            <Link to={routes.MYVIDEOS}><Button primary>My Videos</Button></Link>
          </Grid.Column>
        </Grid>
        <br />
        {this.props.children}
        <br />

        <SignOutButton floated="right" />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  var positionError = state.position.error;

  if (!state.position.geoQuery) {
    positionError = "Waiting for location..."
  }

  return {
    authUser: state.sessionState.authUser,
    geoQuery: state.position.geoQuery,
    radius: state.position.radius,
    coordinate: { latitude: state.position.latitude, longitude: state.position.longitude },
    positionError: positionError
  };
};

export default connect(mapStateToProps, {
  watchLocation: _.once(watchLocation),
  radiusUpdate,
  radiusUpdateComplete,
  updateLocation
})(SignLayout);

