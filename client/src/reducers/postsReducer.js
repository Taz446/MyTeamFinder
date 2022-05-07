import {
    FETCH_POST,
    FETCH_POSTS,
    RESET_POSTS,
    CREATE_POST,
    DELETE_POST
} from '../actions/actionTypes';

import _ from 'lodash';

const INITIAL_STATE = {}

const postsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_POSTS:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case FETCH_POST:
        case CREATE_POST:
            return {...state, [action.payload.id]: action.payload}
        case DELETE_POST:
            return _.omit(state, action.payload);
        case RESET_POSTS:
            return INITIAL_STATE;
        default:
            return state;
    };
};

export default postsReducer;