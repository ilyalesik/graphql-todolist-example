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

export const login = (login, password) => dispatch => {
    const apollo = initApollo();
    let token;
    apollo.mutate({
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
        token = data.data.createToken.token;
        return apollo.query({
            query: gql`
                query viewer($token: String!) {
                    viewer(token: $token) {
                      firstName
                      lastName
                      login
                    }
                }`,
            variables: {token}
        })
    }).then(data => {
        dispatch({type: 'LOGIN_SUCCESS',  ...data.data.viewer, token});
    }).catch(error => {
        console.log(error);
        dispatch({type: 'LOGIN_ERROR'});
    });
};
