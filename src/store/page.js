const initialState = {
    list: []
}

function page(state = initialState, action) {
    switch (action.type) {
        case 'page':
            return Object.assign({}, state, action.data);
        default :
            return state;
    }
}

export default page;