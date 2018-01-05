import axios from 'axios';

const url = 'https://reddit.com/r/pics.json?limit=100';
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
    // axios.post(url, {
    //     headers: {'Access-Control-Allow-Origin': '*',
    //         'Content-Type': 'application/json;charset=UTF-8',
    //         'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT',
    //         'Access-Control-Allow-Headers': 'Content-Type, Content-Range, Content-Disposition, Content-Description'
    //     }
    // })
    axios(url)
        .then((responseBody) => {
            dispatch(loadPics(responseBody.data.data.children ));
            after = responseBody.data.data.after;
        })
        .catch(error => {
            console.log(error);
            dispatch(clearPics());
        });
};

export const loadMorePics = () => (dispatch) => {
    const newUrl = `${url}&after=${after}`;
    axios(newUrl)
        .then((responseBody) => {
            dispatch(appendPics(responseBody.data.data.children));
            after = responseBody.data.data.after;
        })
        .catch(error => {
            console.log(error);
            dispatch(clearPics());
        });
};