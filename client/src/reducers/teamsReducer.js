import {
    FETCH_TEAMS,
    FETCH_TEAM,
    CREATE_TEAM,
    UPDATE_TEAM,
    DELETE_TEAM,
    RESET_TEAMS
} from '../actions/actionTypes';

import _ from 'lodash';

const teamsReducer = (state = {}, action) => {
    switch (action.type) { 
        case FETCH_TEAMS:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case FETCH_TEAM:
        case CREATE_TEAM:
        case UPDATE_TEAM:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_TEAM:
            return _.omit(state, action.payload);
        case RESET_TEAMS:
            return {}
        default:
            return state;
    };
};

export default teamsReducer;