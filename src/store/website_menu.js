const initialState = {
    list: []
}

function website_menu(state = initialState, action) {
    switch (action.type) {
        case 'website_menu':
            return Object.assign({}, state, action.data);
        default :
            return state;
    }
}

export default website_menu;