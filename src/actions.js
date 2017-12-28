import axios from 'axios';

export const addPics = pics => ({
    type: 'ADD_PICS',
    pics,
});

export const clearPics = () => ({
    type: 'CLEAR_PICS'
});


export const getPics = () => (dispatch) => {
    const url = 'https://reddit.com/r/pics.json?limit=30';
    axios(url)
        .then((responseBody) => {
            dispatch(addPics(responseBody.data.data.children.slice(1)));
        })
        .catch(error => {
            console.log(error);
            dispatch(clearPics())
        });
}