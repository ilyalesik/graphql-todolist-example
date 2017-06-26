import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {updateIntl} from 'react-intl-redux'
import en from './lang/en'
import ru from './lang/ru'
import initApollo from './initApollo'
import { gql } from 'react-apollo'

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

export const login = (login, password) => dispatch => {
    initApollo().mutate({
        mutation: gql`
          mutation login($login: String!, $password: String!) {
              createToken(login: $login, password: $password) {
                token
                err
              }
            }
        `,
        variables: {login: login, password: password}
    }).then(data => {
        dispatch({type: 'LOGIN_SUCCESS', token: data.data.createToken.token});
    }).catch(error => {
        console.log(error);
        dispatch({type: 'LOGIN_ERROR'});
    });
};
