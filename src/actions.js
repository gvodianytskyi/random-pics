import axios from 'axios';

const url = 'https://reddit.com/r/pics.json?limit=10';
let after = null;

export const loadPics = pics => ({
    type: 'LOAD_PICS',
    pics
});

export const appendPics = pics => ({
    type: 'APPEND_PICS',
    pics
});

export const clearPics = () => ({
    type: 'CLEAR_PICS'
});

export const getPics = () => (dispatch) => {
    axios(url)
        .then((responseBody) => {
            dispatch(loadPics(responseBody.data.data.children.slice(1)));
            after = responseBody.data.data.after;
        })
        .catch(error => {
            console.log(error);
            dispatch(clearPics());
        });
};

export const loadMorePics = () => (dispatch) => {
    const newUrl = `${url}&after=${after}`;
    console.log('newUrl: ', newUrl);
    axios(newUrl)
        .then((responseBody) => {
            dispatch(appendPics(responseBody.data.data.children.slice(1)));
            after = responseBody.data.data.after;
        })
        .catch(error => {
            console.log(error);
            dispatch(clearPics());
        });
};