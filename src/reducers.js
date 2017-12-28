import { combineReducers } from 'redux';

export const pics = (state = [], action) => {
    switch (action.type) {
        case 'ADD_PICS':
            return action.pics;
        case 'CLEAR_PICS':
            return [];
        default:
            return state;
    }
};

export const reducers = combineReducers({ pics });