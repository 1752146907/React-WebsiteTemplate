const initialState = {
    organization_id: '6fd70c5e490e403b844ca722e0a5d756',
    teacher_list: [],
    student_list: [],
    article_list: [],
    article_list_2: []
};

function junior(state = initialState, action) {
    switch (action.type) {
        case 'junior':
            return Object.assign({}, state, action.data);

        default :
            return state;
    }
}

export default junior;