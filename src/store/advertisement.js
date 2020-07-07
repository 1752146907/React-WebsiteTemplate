const initialState = {
    list: []
}

function advertisement(state = initialState, action) {
    switch (action.type) {
        case 'advertisement':
            return Object.assign({}, state, action.data);
        default :
            return state;
    }
}

export default advertisement;