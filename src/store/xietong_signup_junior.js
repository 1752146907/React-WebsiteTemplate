const initialState = {
    list: []
}

function xietong_signup_junior(state = initialState, action) {
    switch (action.type) {
        case 'xietong_signup_junior':
            return Object.assign({}, state, action.data);
        default :
            return state;
    }
}

export default xietong_signup_junior;