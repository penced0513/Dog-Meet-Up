import { csrfFetch } from "./csrf";

const GET_GROUPS = 'group/getGroups'
const ADD_GROUP = 'group/addGroup'

export const getGroups = (groups) => {
    return { type: GET_GROUPS, groups };
};

export const addGroup = (name, imgURL, location, description, userId) => {
    const payload = {name, imgURL, location, description, userId}
    return { type: GET_GROUPS, payload };
};

export const postGroup = (name, imgURL, location, description, userId) => {
    const payload = {name, imgURL, location, description, userId}
    // const res = await csrfFetch('/api/groups/new', {
    //     method:}
    //     )
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
        case ADD_GROUP: 
            return state;
        default: 
            return state;
    }
}

export default groupReducer
