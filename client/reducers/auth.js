const initialState = {
    isAuthorized: false
};

function loginSuccess(state, token, login, firstName, lastName) {
    return Object.assign({}, state, {isAuthorized: true, token, login, firstName, lastName});
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return loginSuccess(state, action.token, action.login, action.firstName, action.lastName);
        default: return state;
    }
}