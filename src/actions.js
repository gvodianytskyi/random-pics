import axios from 'axios';
import types from './types';

export const url = 'https://www.reddit.com/r/pics.json?limit=100';
let after = null;

export const getUrl = () => (
    after ? `${url}&after=${after}` : url
);

export const loadPicsRequest = () => ({
    type: types.LOAD_PICS_REQUEST
});

export const appendPicsRequest = () => ({
    type: types.APPEND_PICS_REQUEST
});

export const loadPics = pics => ({
    type: types.LOAD_PICS_SUCCESS,
    pics
});

export const appendPics = pics => ({
    type: types.APPEND_PICS_SUCCESS,
    pics
});

export const clearPics = () => ({
    type: types.LOAD_PICS_FAILURE
});

export const showSpinner = () => ({
    type: types.SHOW_SPINNER
});

export const hideSpinner = () => ({
    type: types.HIDE_SPINNER
});

export const getPics = () => (dispatch) => {
    dispatch(loadPicsRequest());
    return axios.get(getUrl())
        .then((responseBody) => {
            dispatch(loadPics(responseBody.data.data.children));
            after = responseBody.data.data.after;
        })
        .catch(error => {
            console.log(error);
            dispatch(clearPics());
        });
};

export const loadMorePics = () => (dispatch) => {
    dispatch(appendPicsRequest());
    dispatch(showSpinner());
    return axios.get(getUrl())
        .then((responseBody) => {
            dispatch(appendPics(responseBody.data.data.children));
            dispatch(hideSpinner());
            after = responseBody.data.data.after;
        })
        .catch(error => {
            console.log(error);
            dispatch(clearPics());
        });
};