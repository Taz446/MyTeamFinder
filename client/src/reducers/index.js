import { combineReducers } from "redux";
import { reducer as formReducer} from 'redux-form';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from "./authReducer";
import gamesReducer from "./gamesReducer";
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';
import filtersReducer from "./filtersReducer";
import teamsReducer from './teamsReducer';
import teamPlayersReducer from "./teamPlayersReducer";
import teamInvitesReducer from "./teamInvitesReducer";
import teamRequestsReducer from './teamRequestsReducer';
import recommendationsReducer from "./recommendationsReducers";

const persistConfig = {
    key: 'main-root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer);

export default combineReducers({
    auth: persistedReducer,
    form: formReducer,
    users: usersReducer,
    games: gamesReducer,
    posts: postsReducer,
    filters: filtersReducer,
    teams: teamsReducer,
    teamPlayers: teamPlayersReducer,
    teamInvites: teamInvitesReducer,
    teamRequests: teamRequestsReducer,
    recommendations: recommendationsReducer
});