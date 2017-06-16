import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom'
import App from './app'


const initialState = window.__INITIAL_STATE__;
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const store = createStoreWithMiddleware(reducer, initialState);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);