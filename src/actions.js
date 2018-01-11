import axios from 'axios';

const url = 'https://www.reddit.com/r/pics.json?limit=100';
let after = null;

export const loadPics = pics => ({
    type: 'LOAD_PICS',
    pics
});

export const appendPics = pics => ({
    type: 'APPEND_PICS',
    pics
});

export const showSpinner = () => ({
   type: 'SHOW_SPINNER'
});

export const hideSpinner = () => ({
    type: 'HIDE_SPINNER'
});

export const clearPics = () => ({
    type: 'CLEAR_PICS'
});

export const getPics = () => (dispatch) => {
    axios.get(url)
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
    const newUrl = `${url}&after=${after}`;
    dispatch(showSpinner());
    axios.get(newUrl)
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