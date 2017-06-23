import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {updateIntl} from 'react-intl-redux'
import en from './lang/en'
import ru from './lang/ru'

export const initIntl = ({locale, messages}) => dispatch => {
    return dispatch(updateIntl({locale, messages}));
}

export const changeLanguage = () => (dispatch, getState) => {
    const lang = getState().intl.locale;
    return dispatch(updateIntl({locale: lang === 'en' ? 'ru' : 'en', messages: lang === 'en' ? ru : en}));
};

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
