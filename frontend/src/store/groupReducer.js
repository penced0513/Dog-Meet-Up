import { csrfFetch } from "./csrf";

const GET_GROUPS = 'group/getGroups'
const POST_GROUP = 'group/postGroup'
const PUT_GROUP = 'group/putGroup'

export const getGroups = (groups) => {
    return { type: GET_GROUPS, groups };
};

const postGroup = group => {
    return { type: POST_GROUP, group}
}

const putGroup = group => {
    return { type: PUT_GROUP, group}
}

export const createGroup = (name, imgURL, location, description, userId) => async dispatch => {
    const payload = {name, imgURL, location, description, userId}
    const res = await csrfFetch('/api/groups/new', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload) 
    });

    if (res.ok) {
        const group = await res.json();
        await dispatch(postGroup(group))
        return group;
    }
}

export const editGroup = (name, imgURL, location, description, userId, groupId) => async dispatch => {
    const payload = {name, imgURL, location, description, userId}
    const res = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload) 
    });

    if (res.ok) {
        const group = await res.json();
        await dispatch(putGroup(group))
        return group;
    }
}


export const fetchGroups = () => async (dispatch) => {
    const res = await csrfFetch('/api/groups')
    const groups = await res.json();
    dispatch(getGroups(groups))
}

const groupReducer = ( state= {}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_GROUPS:
            Object.values(action.groups).forEach(group => {
                newState[group.id] = group
            });
            return newState
        case POST_GROUP: 
            newState[action.group.id] = action.group
            return newState;
        case PUT_GROUP: 
            newState[action.group.id] = action.group
            return newState;
        default: 
            return state;
    }
}

export default groupReducer
