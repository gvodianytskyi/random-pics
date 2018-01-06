import { combineReducers } from 'redux';

export const pics = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_PICS':
            return action.pics ;
        case 'APPEND_PICS':
            return [...state, ...action.pics];
        case 'CLEAR_PICS':
            return [];
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_SPINNER':
            return true;
        case 'HIDE_SPINNER':
            return false;
        default:
            return state;
    }
}

export const reducers = combineReducers({ pics, loading });