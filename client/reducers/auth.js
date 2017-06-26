const initialState = {
    isAuthorized: false
};

function loginSuccess(state, token) {
    return Object.assign({}, state, {isAuthorized: true, token});
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return loginSuccess(state, action.token);
        default: return state;
    }
}