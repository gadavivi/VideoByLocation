import {
    MY_VIDEOS_FETCH,
    DELETE_VIDEO_PROCESS,
    DELETE_VIDEO,
    DELETE_VIDEO_ERROR
} from './types';

import { db } from '../firebase/firebase';


export const getMyVideos = ({ userId }) => {
    return (dispatch) => {
        db.ref('Videos').orderByChild('owner').equalTo(userId).once('value', (snapshot) => {
            dispatch({
                type: MY_VIDEOS_FETCH,
                payload: snapshot.val()
            });
        });
    }
}

export const deleteVideo = (VideoId) => {
    return (dispatch) => {
        dispatch({ type: DELETE_VIDEO_PROCESS, payload: VideoId })
        db.ref(`Videos/${VideoId}`).remove()
            .then(() => {
                dispatch({
                    type: DELETE_VIDEO,
                    payload: VideoId
                });
            })
            .catch((error) => {
                dispatch({
                    type: DELETE_VIDEO_ERROR,
                    payload: VideoId
                });
            });
    };
}