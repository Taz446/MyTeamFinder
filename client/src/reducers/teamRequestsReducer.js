import {FETCH_TEAM_REQUESTS, RESET_TEAM_REQUESTS} from '../actions/actionTypes';

const INITIAL_STATE = {
    lolTeamRequests: [],
    dotaTeamRequests: []
}

const teamRequestsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_TEAM_REQUESTS:
            return {...state, ...action.payload};
        case RESET_TEAM_REQUESTS:
            return INITIAL_STATE;
        default:
            return state;
    };
};

export default teamRequestsReducer;