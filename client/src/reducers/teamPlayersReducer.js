import {
    GET_TEAM_PLAYERS,
    RESET_TEAM_PLAYERS
} from '../actions/actionTypes';

const INITIAL_STATE = {};

const teamPlayersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) { 
        case GET_TEAM_PLAYERS:
            return {...state, ...action.payload};
        case RESET_TEAM_PLAYERS:
            return INITIAL_STATE
        default:
            return state;
    };
};

export default teamPlayersReducer;