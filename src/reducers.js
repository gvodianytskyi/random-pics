import { combineReducers } from 'redux';
import types from './types';

export const pics = (state = [], action) => {
    switch (action.type) {
        case types.LOAD_PICS_SUCCESS:
            return action.pics;
        case types.APPEND_PICS_SUCCESS:
            return [...state, ...action.pics];
        case types.LOAD_PICS_FAILURE:
            return [];
        default:
            return state;
    }
}

export const loading = (state = false, action) => {
    switch (action.type) {
        case types.SHOW_SPINNER:
            return true;
        case types.HIDE_SPINNER:
            return false;
        default:
            return state;
    }
}

export const reducers = combineReducers({ pics, loading });