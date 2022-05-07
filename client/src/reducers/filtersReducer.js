import {SET_FILTERS, RESET_FILTERS} from '../actions/actionTypes';

const INITIAL_STATE = {}

const filtersReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_FILTERS:
            return {...state, ...action.payload};
        case RESET_FILTERS:
            return INITIAL_STATE;
        default:
            return state;
    };
};

export default filtersReducer;