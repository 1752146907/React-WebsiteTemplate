const initialState = {
    article_list: [],
    float_advertisement_list: []
};

function index(state = initialState, action) {
    switch (action.type) {
        case 'index':
            return Object.assign({}, state, action.data);

        default :
            return state;
    }
}

export default index;