import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import types from './types';
import { loadPics, loadMorePics, appendPics, clearPics, getPics, getUrl } from './actions';


const loadData = {
    "data": {
        "children": [
            {
                "data": {
                    "preview": {
                        "images": [
                            {
                                "source": {
                                    "url": "https://i.redditmedia.com/load1"
                                }
                            }
                        ]
                    }
                }
            },
            {
                "data": {
                    "preview": {
                        "images": [
                            {
                                "source": {
                                    "url": "https://i.redditmedia.com/load2"
                                }
                            }
                        ]
                    }
                }
            }
        ]
    }
};

const appendData = {
    "data": {
        "children": [
            {
                "data": {
                    "preview": {
                        "images": [
                            {
                                "source": {
                                    "url": "https://i.redditmedia.com/append1"
                                }
                            }
                        ]
                    }
                }
            },
            {
                "data": {
                    "preview": {
                        "images": [
                            {
                                "source": {
                                    "url": "https://i.redditmedia.com/append2"
                                }
                            }
                        ]
                    }
                }
            }
        ]
    }
};

describe('actions', () => {
    const pics = loadData.data.children;

    test('should create an action to load pics', () => {
        const expectedAction = {
            type: types.LOAD_PICS_SUCCESS,
            pics
        }
        expect(loadPics(pics)).toEqual(expectedAction);
    });

    test('should create an action to append pics', () => {
        const expectedAction = {
            type: types.APPEND_PICS_SUCCESS,
            pics
        }
        expect(appendPics(pics)).toEqual(expectedAction);
    });

    test('should create an action to clear pics', () => {
        const expectedAction = {
            type: types.LOAD_PICS_FAILURE
        }
        expect(clearPics()).toEqual(expectedAction);
    });
});

describe('async actions', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const mock = new MockAdapter(axios);

    test('creates LOAD_PICS_SUCCESS when loading pics has been done', () => {
        const store = mockStore({});
        mock.onGet(getUrl()).reply(200, loadData);

        const expectedActions = [
            { type: types.LOAD_PICS_REQUEST },
            { type: types.LOAD_PICS_SUCCESS, pics: loadData.data.children }
        ];

        return store.dispatch(getPics()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            mock.reset();
        })
    });

    test('creates APPEND_PICS_SUCCESS when appending pics has been done', () => {
        const store = mockStore({});
        mock.onGet(getUrl()).reply(200, appendData);

        const expectedActions = [
            { type: types.APPEND_PICS_REQUEST },
            { type: types.SHOW_SPINNER },
            { type: types.APPEND_PICS_SUCCESS, pics: appendData.data.children },
            { type: types.HIDE_SPINNER }
        ];

        return store.dispatch(loadMorePics()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            mock.reset();
        })
    });
});