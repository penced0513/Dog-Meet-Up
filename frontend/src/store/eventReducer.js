import { csrfFetch } from "./csrf";

const GET_EVENTS = 'group/getEvents'

export const getEvents = (events) => {
    return { type: GET_EVENTS, events };
};

export const fetchEvents = () => async (dispatch) => {
    const res = await csrfFetch('/api/events')
    const events = await res.json();
    dispatch(getEvents(events))
}

const eventReducer = ( state= { allEvents: {}, joined: {}}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_EVENTS:
            Object.values(action.events).forEach(event => {
                newState.allEvents[event.id] = event
            });
            return newState
        default: 
            return state;
    }
}

export default eventReducer
