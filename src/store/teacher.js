const initialState = {
    list: []
}

function teacher(state = initialState, action) {
    switch (action.type) {
        case 'teacher':
            return Object.assign({}, state, action.data);
        default :
            return state;
    }
}

export default teacher;