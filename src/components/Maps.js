import _ from 'lodash';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { Container, Button, Icon } from 'semantic-ui-react';

import withAuthorization from './Session/withAuthorization';
import SignLayout from './SignLayout';
import { updateMapLocation } from '../actions';
import { MAP_DEFAUL_CENTER, GOOGLE_MAP_KEY } from '../constants/map';


const MarkerComponent = ({ uri }) => <Link to={`https://www.youtube.com/watch?v=${uri}`} target="_blank"><Icon name="marker" size="large" /></Link>;

class MapPage extends Component {
    static defaultProps = {
        center: {
            lat: MAP_DEFAUL_CENTER.LAT,
            lng: MAP_DEFAUL_CENTER.LNG
        },
        zoom: MAP_DEFAUL_CENTER.ZOOM
    };
    rendervideos() {
        return _.map(this.props.videos, (value, prop) => {
            const { uri, latitude, longitude } = value;
            return (
                <MarkerComponent key={prop}
                    uri={uri}
                    lat={latitude}
                    lng={longitude}
                />
            );
        });
    }

    updateMapLocation({ center, zoom, bounds, ...other }) {
        this.props.updateMapLocation({ center, geoQuery: this.props.geoQuery })
    }
    render() {
        const { zoom, mapCenter, center } = this.props;
        return (
            <SignLayout>
                <Container style={{ height: '100vh', width: '100%' }} fluid>
                    <GoogleMapReact
                        onChange={this.updateMapLocation.bind(this)}
                        bootstrapURLKeys={{ key: [GOOGLE_MAP_KEY] }}
                        defaultCenter={center}
                        center={mapCenter || center}
                        defaultZoom={zoom}
                    >
                        {this.rendervideos()}
                    </GoogleMapReact>
                </Container>
            </SignLayout>
        );
    }
}

const authCondition = (authUser) => !!authUser;

const mapStateToProps = state => {
    return {
        videos: { ...state.fetchVideos, ...state.mapVideos },
        authUser: state.sessionState.authUser.uid,
        mapCenter: state.position.mapCenter,
        geoQuery: state.position.mapGeoQuery
    };
}

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, { updateMapLocation })
)(MapPage);