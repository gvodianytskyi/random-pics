import { combineReducers } from 'redux';

export const pics = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_PICS':
            return action.pics;
        case 'APPEND_PICS':
            return [...state, ...action.pics];
        case 'CLEAR_PICS':
            return [];
        default:
            return state;
    }
};

export const reducers = combineReducers({ pics });