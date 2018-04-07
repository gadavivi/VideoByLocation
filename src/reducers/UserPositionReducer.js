import {
    UPDATE_POSITION,
    UPDATE_RADIOS,
    UPDATE_RADIOS_COMPLETE,
    PERMISSION_ERROR,
    SET_MAP_QUERY,
    UPDATE_MAP_CENTER
} from '../actions/types';

import { FEED_DEFAULT_RADIUS, PERMISSION_ERROR_MSG } from '../constants/feed'

const INITIAL_STATE = {
    latitude: '',
    longitude: '',
    radius: FEED_DEFAULT_RADIUS,
    geoQuery: null,
    mapCenter: null,
    mapGeoQuery: null,
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_POSITION:
            const { latitude, longitude, geoQuery } = action.payload;
            if (!state.geoQuery) {
                state = { ...state, mapCenter: { lat: latitude, lng: longitude } }
            }
            if (state.latitude !== latitude || state.longitude !== longitude || state.geoQuery !== geoQuery) {
                return { ...state, ...action.payload };
            }
            return state;
        case UPDATE_RADIOS:
            return { ...state, ...action.payload }
        case UPDATE_RADIOS_COMPLETE:
            const { radius } = action.payload;
            state.geoQuery.updateCriteria({ radius })
            return { ...state, ...action.payload };
        case PERMISSION_ERROR:
            return { ...state, error: PERMISSION_ERROR_MSG }
        case SET_MAP_QUERY:
            return { ...state, mapGeoQuery: action.payload }
        case UPDATE_MAP_CENTER:
            return { ...state, mapCenter: action.payload }
        default:
            return state;
    }
};