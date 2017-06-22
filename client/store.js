import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'
import {updateIntl} from 'react-intl-redux'

export const initIntl = ({locale, messages}) => dispatch => {
    return dispatch(updateIntl({locale, messages}));
}

// ACTIONS
export const serverRenderClock = (isServer) => dispatch => {
  return dispatch({ type: 'TICK', light: !isServer, ts: Date.now() })
}

export const startClock = () => dispatch => {
  return setInterval(() => dispatch({ type: 'TICK', light: true, ts: Date.now() }), 800)
}

export const addCount = () => dispatch => {
  return dispatch({ type: 'ADD' })
}

export const initStore = (initialState ) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
