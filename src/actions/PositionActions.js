import _ from 'lodash';

import {
    VIDEOS_FETCH_SUCCESS,
    PERMISSION_ERROR,
    UPDATE_POSITION,
    UPDATE_RADIOS,
    UPDATE_RADIOS_COMPLETE,
    VIDEOS_REMOVE,
    MAP_VIDEOS_FETCH_SUCCESS,
    MAP_VIDEOS_REMOVE,
    SET_MAP_QUERY,
    UPDATE_MAP_CENTER
} from './types';

import { GOOGLE_MAP_DEFAULT_RADIUS } from '../constants/map'

import { auth, db, geoFire } from '../firebase/firebase';

export const watchLocation = ({ radius }) => {

    const geolocation = navigator.geolocation;

    const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
    };

    //creating a geoQuery instance (because this function is called only once it acts as a singletone...)
    const geoQuery = geoFire.query({
        center: [32, 32],//just random numbers, when it will be avalibale the watchPosition callback will set the currect values..
        radius: radius
    });

    return (dispatch) => {

        if (!geolocation) {
            dispatch({ type: PERMISSION_ERROR });
        }

        geoQuery.on("key_entered", function (key, location, distance) {
            db.ref(`/Videos/${key}`).once('value', (snapshot) => dispatch({ type: VIDEOS_FETCH_SUCCESS, payload: { [key]: { ...snapshot.val(), distance } } }))
        });
        geoQuery.on("key_exited", function (key, location, distance) {
            db.ref(`/Videos/${key}`).once('value', (snapshot) => dispatch({ type: VIDEOS_REMOVE, payload: { key: key } }));
        })

        geolocation.watchPosition(position => {
            const { currentUser } = auth;
            const { coords: { latitude, longitude } } = position;
            dispatch({ type: UPDATE_POSITION, payload: { geoQuery, latitude, longitude } });
        }, null, options);
    }
};

export const radiusUpdate = ({ radius }) => {
    return {
        type: UPDATE_RADIOS,
        payload: { radius }
    }
}

export const radiusUpdateComplete = ({ radius }) => {
    return {
        type: UPDATE_RADIOS_COMPLETE,
        payload: { radius }
    }
}
export const updateMapLocation = ({ center, geoQuery }) => {
    return (dispatch) => {

        if (!geoQuery) {
            const geoQuery = geoFire.query({
                center: [center.lat, center.lng],
                radius: GOOGLE_MAP_DEFAULT_RADIUS
            });
            geoQuery.on("key_entered", function (key, location, distance) {
                db.ref(`/Videos/${key}`).once('value', (snapshot) => dispatch({ type: MAP_VIDEOS_FETCH_SUCCESS, payload: { [key]: { ...snapshot.val(), distance } } }))
            });
            geoQuery.on("key_exited", function (key, location, distance) {
                db.ref(`/Videos/${key}`).once('value', (snapshot) => dispatch({ type: MAP_VIDEOS_REMOVE, payload: { key: key } }));
            })
            dispatch({ type: SET_MAP_QUERY, payload: geoQuery })
        }
        else {
            geoQuery.updateCriteria({ center: [center.lat, center.lng] });
        }
        dispatch({ type: UPDATE_MAP_CENTER, payload: center })
    }
}

export const updateLocation = ({ latitude, longitude, geoQuery }) => {
    return (dispatch) => {
        geoQuery.updateCriteria({ center: [latitude, longitude] });
    }
}