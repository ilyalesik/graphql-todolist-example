import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import reducer1 from './reducers/reducer1'
import {intlReducer} from 'react-intl-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

let reduxStore = null

function create(apollo, initialState = {}) {
    return createStore(
        combineReducers({ // Setup reducers
            reducer1,
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
