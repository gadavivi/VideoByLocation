import {
    SAVE_VIDEO,
    SAVE_VIDEO_PROCESS,
    NEW_FIELD_UPDATE,
    ERROR_SAVE_VIDEO,
} from './types';

import { auth, db } from '../firebase/firebase';

const fix_uri = (uri) => {
    if (uri.startsWith("https://www.youtube.com/watch?v=")) {
        return uri.replace("https://www.youtube.com/watch?v=", "");
    } else if (uri.startsWith("https://youtu.be/")) {
        return uri.replace("https://youtu.be/", "");
    } else {
        return null;
    }
}

export const saveVideo = ({ uri, latitude, longitude }) => {
    const { currentUser } = auth;
    return (dispatch) => {
        dispatch({ type: SAVE_VIDEO_PROCESS });
        const fixuri = fix_uri(uri);
        if (fixuri) {
            db.ref(`/Videos`).push({ uri: fixuri, latitude, longitude, owner: currentUser.uid })
                .then((result) => {
                    dispatch({ type: SAVE_VIDEO })
                })
                .catch((error) => dispatch({ type: ERROR_SAVE_VIDEO, payload: error.message }));
        }
        else {
            dispatch({ type: ERROR_SAVE_VIDEO, payload: "Bad Link!" })
        }
    }
}

export const fieldUpdate = ({ prop, value }) => {
    return {
        type: NEW_FIELD_UPDATE,
        payload: { prop, value }
    }
}