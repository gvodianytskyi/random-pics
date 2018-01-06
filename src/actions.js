import axios from 'axios';
// import $ from 'jquery';

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
    axios(url)
        .then((responseBody) => {
            dispatch(loadPics(responseBody.data.data.children));
            after = responseBody.data.data.after;
        })
        .catch(error => {
            console.log(error);
            dispatch(clearPics());
        });

    // axios.post(url, {
    //     headers: {'Access-Control-Allow-Origin': '*',
    //         'Content-Type': 'application/json;charset=UTF-8',
    //         'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT',
    //         'Access-Control-Allow-Headers': 'Content-Type, Content-Range, Content-Disposition, Content-Description'
    //     }
    // })

    // $.ajax({
    //     url: url,
    //     type: 'GET',
    //     headers: { 'Access-Control-Allow-Origin': '*' },
    //     success: function (responseBody) {
    //         console.log(responseBody.data );
    //         dispatch(loadPics(responseBody.data.children ));
    //         after = responseBody.data.after;
    //     },
    //     dataType: 'json',
    //     crossDomain: true
    // })
};

export const loadMorePics = () => (dispatch) => {
    const newUrl = `${url}&after=${after}`;
    dispatch(showSpinner());
    axios(newUrl)
        .then((responseBody) => {
            dispatch(appendPics(responseBody.data.data.children));
            dispatch(hideSpinner());
            after = responseBody.data.data.after;
        })
        .catch(error => {
            console.log(error);
            dispatch(clearPics());
        });

    // $.ajax(newUrl)
    //     .done(function (responseBody) {
    //         console.log(responseBody.data );
    //         dispatch(appendPics(responseBody.data.children ));
    //         after = responseBody.data.after;
    //     });
};