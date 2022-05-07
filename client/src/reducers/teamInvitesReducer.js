import {FETCH_TEAM_INVITES, RESET_TEAM_INVITES} from '../actions/actionTypes';

const INITIAL_STATE = {
    lolTeamInvites: [],
    dotaTeamInvites: []
}

const teamInvitesReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_TEAM_INVITES:
            return {...state, ...action.payload};
        case RESET_TEAM_INVITES:
            return INITIAL_STATE;
        default:
            return state;
    };
};

export default teamInvitesReducer;