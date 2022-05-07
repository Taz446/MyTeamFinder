import {FETCH_GAME, FETCH_GAMES} from '../actions/actionTypes';

import _ from 'lodash';

const gamesReducer = (state = {}, action) => {
    switch(action.type) {
        case FETCH_GAMES:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case FETCH_GAME:
            return {...state, [action.payload.data.id]: action.payload}
        default:
            return state;
    };
};

export default gamesReducer;