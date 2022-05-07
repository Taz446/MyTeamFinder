import { 
    SIGN_IN, 
    SIGN_OUT,
    FETCH_GAMES,
    FETCH_GAME,
    CREATE_USER,
    FETCH_USERS,
    FETCH_USER,
    FETCH_USER_BY_GOOGLEID,
    FETCH_USER_BY_EMAIL,
    DELETE_USER,
    EDIT_USER,
    CHANGE_PASSWORD,
    FETCH_POSTS,
    FETCH_POST,
    CREATE_POST,
    DELETE_POST,
    RESET_POSTS,
    SET_FILTERS,
    RESET_FILTERS,
    FETCH_TEAMS,
    FETCH_TEAM,
    CREATE_TEAM,
    UPDATE_TEAM,
    DELETE_TEAM,
    GET_TEAM_PLAYERS,
    RESET_TEAM_PLAYERS,
    RESET_TEAMS,
    FETCH_TEAM_INVITES,
    FETCH_TEAM_REQUESTS,
    RESET_TEAM_INVITES,
    RESET_TEAM_REQUESTS,
    GET_RECOMMENDATIONS,
    RESET_RECOMMENDATIONS
} from "./actionTypes";

import mtf from '../apis/mtf'

export const signIn = user => {
    return {
        type: SIGN_IN,
        payload: user
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createUser = (formValues) => async dispatch => {
    const response = await mtf.post('/users', {...formValues});
    dispatch({
        type: CREATE_USER,
        payload: response.data
    });
};

export const fetchUsers = () => async dispatch => {
    const response = await mtf.get('/users');
    dispatch({
        type: FETCH_USERS,
        payload: response.data
    });
};

export const fetchUser = userId => async dispatch => {
    const response = await mtf.get(`/users/${userId}`);
    dispatch({
        type: FETCH_USER,
        payload: response.data
    });
};

export const fetchUserByGoogleId = googleId => async dispatch => {
    const response = await mtf.get(`/users/google-id/${googleId}`);
    dispatch({
        type: FETCH_USER_BY_GOOGLEID,
        payload: response.data
    });
}

export const fetchUserByEmail = email => async dispatch => {
    const response = await mtf.get(`/users/emails/${email}`);
    dispatch({
        type: FETCH_USER_BY_EMAIL,
        payload: response.data
    });
}

export const editUser = (userId, formValues) => async dispatch => {
    const response = await mtf.put(`/users/${userId}`, formValues);
    dispatch({
        type: EDIT_USER,
        payload: response.data
    });
};

export const changePassword = (userId, password) => async dispatch => {
    const response = await mtf.put(`/users/password-change/${userId}`, {password:password});
    dispatch({
        type: CHANGE_PASSWORD,
        payload: response.data
    });
}

export const deleteUser = userId => async dispatch => {
    await mtf.delete(`/users/${userId}`);
    dispatch({
        type: DELETE_USER,
        payload: userId
    });
};

export const fetchGame = gameId => async dispatch => {
    const response = await mtf.get(`/games/${gameId}`);
    dispatch({
        type: FETCH_GAME,
        payload: response.data
    });
};

export const fetchGames = () => async dispatch => {
    const response = await mtf.get(`/games`);
    dispatch({
        type: FETCH_GAMES,
        payload: response.data
    });
};

export const fetchPosts = (gameId, type) => async dispatch => {
    const response = await mtf.get(`/posts/${gameId}/${type}`);
    dispatch({
        type: FETCH_POSTS,
        payload: response.data
    });
}

export const fetchPost = id => async dispatch => {
    const response = await mtf.get(`/posts/${id}`);
    dispatch({
        type: FETCH_POST,
        payload: response.data
    });
}

export const createPost = post => async dispatch => {
    const response = await mtf.post(`/posts`, post);
    dispatch({
        type: CREATE_POST,
        payload: response.data
    });
}

export const deletePost = postId => async dispatch => {
    await mtf.delete(`/posts/${postId}`);
    dispatch({
        type: DELETE_POST,
        payload: postId
    });
};

export const resetPosts = () => {
    return {
        type: RESET_POSTS
    };
}

export const setFilters = filters => {
    return {
        type: SET_FILTERS,
        payload: filters
    };
}

export const resetFilters = () => {
    return {
        type: RESET_FILTERS
    };
}

export const fetchTeams = () => async dispatch => {
    const response = await mtf.get('/teams');
    dispatch({
        type: FETCH_TEAMS,
        payload: response.data
    });
}

export const fetchTeam = teamId => async dispatch => {
    const response = await mtf.get(`/teams/${teamId}`);
    dispatch({
        type: FETCH_TEAM,
        payload: response.data
    });
}

export const createTeam = (formValues, userId) => async dispatch => {
    const response = await mtf.post(`/teams/create/${userId}`, {...formValues});
    dispatch({
        type: CREATE_TEAM,
        payload: response.data
    });
};

export const updateTeam = (teamId, formValues) => async dispatch => {
    const response = await mtf.put(`/teams/${teamId}`, formValues);
    dispatch({
        type: UPDATE_TEAM,
        payload: response.data
    });
};

export const deleteTeam = teamId => async dispatch => {
    await mtf.delete(`/teams/${teamId}`);
    dispatch({
        type: DELETE_TEAM,
        payload: teamId
    });
};

export const resetTeams = () => {
    return({
        type: RESET_TEAMS
    })
}

export const getTeamPlayers = players => {
    return({
        type: GET_TEAM_PLAYERS,
        payload: players
    })
}

export const resetTeamPlayers = () => {
    return({
        type: RESET_TEAM_PLAYERS
    })
}

export const fetchTeamInvites = user => async dispatch => {

    if (user.teamOwned){
        const response = await mtf.post(`/team-invites/team/INVITE`, user.teamOwned);
        dispatch({
            type: FETCH_TEAM_INVITES,
            payload: {
                lolTeamInvites: Object.values(response.data).filter(i => {return i.game.id === 1}),
                dotaTeamInvites: Object.values(response.data).filter(i => {return i.game.id === 2})
            }
        })
    }else {
        const payload = {
            lolTeamInvites: [],
            dotaTeamInvites: []
        }
        if(user.lolUser) {
            if(!user.lolUser.team) {
                const response = await mtf.post(`/team-invites/lol-user/INVITE`, user.lolUser);
                payload.lolTeamInvites = response.data;
            }
        }
        if(user.dotaUser) {
            if(!user.dotaUser.team) {
                const response = await mtf.post(`/team-invites/dota-user/INVITE`, user.dotaUser);
                payload.dotaTeamInvites = response.data;
            }
        }
        dispatch({
            type: FETCH_TEAM_INVITES,
            payload: payload
        })
    }
}

export const resetTeamInvites = () => {
    return({
        type: RESET_TEAM_INVITES
    })
}

export const fetchTeamRequests = user => async dispatch => {
    if (user.teamOwned){
        const response = await mtf.post(`/team-invites/team/REQUEST`, user.teamOwned);
        dispatch({
            type: FETCH_TEAM_REQUESTS,
            payload: {
                lolTeamRequests: Object.values(response.data).filter(i => {return i.game.id === 1}),
                dotaTeamRequests: Object.values(response.data).filter(i => {return i.game.id === 2})
            }
        })
    }else {
        const payload = {
            lolTeamRequests: [],
            dotaTeamRequests: []
        }
        if(user.lolUser) {
            if(!user.lolUser.team) {
                const response = await mtf.post(`/team-invites/lol-user/REQUEST`, user.lolUser);
                payload.lolTeamRequests = response.data;
            }
        }
        if(user.dotaUser) {
            if(!user.dotaUser.team) {
                const response = await mtf.post(`/team-invites/dota-user/REQUEST`, user.dotaUser);
                payload.dotaTeamRequests = response.data;
            }
        }
        
        dispatch({
            type: FETCH_TEAM_REQUESTS,
            payload: payload
        })
    }
}

export const resetTeamRequests = () => {
    return({
        type: RESET_TEAM_REQUESTS
    })
}

export const getRecommendations = userId => async dispatch => {
    dispatch({
        type: RESET_RECOMMENDATIONS
    });
    const response = await mtf.get(`/users/recommendation/${userId}`);
    dispatch({
        type: GET_RECOMMENDATIONS,
        payload: response.data
    });
}

export const resetRecommendations = () => {
    return({
        type: RESET_RECOMMENDATIONS
    })
}