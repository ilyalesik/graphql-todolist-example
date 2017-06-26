import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {intlReducer} from 'react-intl-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import auth from './reducers/auth'

let reduxStore = null

function create(apollo, initialState = {}) {
    return createStore(
        combineReducers({ // Setup reducers
            auth,
            intl: intlReducer,
            apollo: apollo.reducer()
        }),
        initialState, // Hydrate the store with server-side data
        composeWithDevTools(
            applyMiddleware(apollo.middleware(), thunkMiddleware)
        )
    )
}

export default function initRedux({apollo, initialState}) {
    // Make sure to create a new store for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        return create(apollo, initialState)
    }

    // Reuse store on the client-side
    if (!reduxStore) {
        reduxStore = create(apollo, initialState)
    }

    return reduxStore
}
