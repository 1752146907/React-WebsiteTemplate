const initialState = {
    list: []
}

function student(state = initialState, action) {
    switch (action.type) {
        case 'student':
            return Object.assign({}, state, action.data);
        default :
            return state;
    }
}

export default student;