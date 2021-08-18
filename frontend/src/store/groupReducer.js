import { csrfFetch } from "./csrf";

const GET_GROUPS = 'group/getGroups'
const POST_GROUP = 'group/postGroup'
const PUT_GROUP = 'group/putGroup'
const DELETE_GROUP = 'group/deleteGroup'
const SET_USER_GROUPS = 'group/setUserGroups'
const DELETE_USER_GROUPS = 'group/deleteUserGroups'

export const getGroups = (groups) => {
    return { type: GET_GROUPS, groups };
};

const postGroup = group => {
    return { type: POST_GROUP, group}
}

const putGroup = group => {
    return { type: PUT_GROUP, group}
}

const destroyGroup = groupId => {
    return { type: DELETE_GROUP, groupId}
}

const setUserGroups = (groups) => {
    return {
      type: SET_USER_GROUPS,
      groups
    }
}

const deleteUserGroups = (groupId) => {
    return {
      type: DELETE_USER_GROUPS,
      groupId
    }
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

export const deleteGroup = (groupId) => async dispatch => {

    const res = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'delete',
    });

    if (res.ok) {
        await dispatch(destroyGroup(groupId))
    }
}

export const getUserGroups = (user) => async dispatch => {
    const res = await csrfFetch(`/api/users/${user.id}/groups`)
    if (res.ok) {
      const groups = await res.json()
      await dispatch(setUserGroups(groups))
      return groups;
    }
}

export const joinGroup = (userId, groupId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/groups/${groupId}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({userId, groupId}) 
    })
    if (res.ok) {
      const groups = await res.json()
      dispatch(setUserGroups(Object.values(groups)))
      return groups;
    } 
}

export const leaveGroup = (userId, groupId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/groups/${groupId}`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({userId, groupId}) 
    })
    if (res.ok) {
      const groupId = await res.json()
      dispatch(deleteUserGroups(Object.values(groupId)))
      return groupId;
    } 
}
export const fetchGroups = () => async (dispatch) => {
    const res = await csrfFetch('/api/groups')
    const groups = await res.json();
    dispatch(getGroups(groups))
}

const groupReducer = ( state= { allGroups: {}, joined: {}}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_GROUPS:
            Object.values(action.groups).forEach(group => {
                newState.allGroups[group.id] = group
            });
            return newState
        case POST_GROUP: 
            newState.allGroups[action.group.id] = action.group
            return newState;
        case PUT_GROUP: 
            newState.allGroups[action.group.id] = action.group
            return newState;
        case DELETE_GROUP:
            delete newState.allGroups[action.groupId]
            return newState
        case SET_USER_GROUPS:
            newState = {...state}
            action.groups.forEach(group => {
                newState.joined[group.groupId] = group
            })
            return newState;
        case DELETE_USER_GROUPS: 
            newState = {...state}
            delete newState.joined[action.groupId]
            return newState
        default: 
            return state;
    }
}

export default groupReducer
