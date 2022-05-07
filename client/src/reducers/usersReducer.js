import {
    FETCH_USER,
    FETCH_USERS,
    CREATE_USER,
    EDIT_USER,
    CHANGE_PASSWORD,
    DELETE_USER,
    FETCH_USER_BY_GOOGLEID,
    FETCH_USER_BY_EMAIL
} from '../actions/actionTypes';

import _ from 'lodash';

const usersReducer = (state = {}, action) => {
    switch (action.type) { 
        case FETCH_USERS:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case FETCH_USER:
        case FETCH_USER_BY_GOOGLEID:
        case FETCH_USER_BY_EMAIL:
        case CREATE_USER:
        case EDIT_USER:
        case CHANGE_PASSWORD:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_USER:
            return _.omit(state, action.payload);
        default:
            return state;
    };
};

export default usersReducer;