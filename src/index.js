import React from 'react';
import ReactDOM from 'react-dom';
import App from './AppContainer';
import { Provider } from 'react-redux';
import { store } from './store';
import 'reset-css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
