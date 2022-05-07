import {
    GET_RECOMMENDATIONS,
    RESET_RECOMMENDATIONS
} from '../actions/actionTypes';

const INITIAL_STATE = {}

const recommendationsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_RECOMMENDATIONS:
            return {...state, ...action.payload};
        case RESET_RECOMMENDATIONS:
            return INITIAL_STATE;
        default:
            return state;
    };
};

export default recommendationsReducer;