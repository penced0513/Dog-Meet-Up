import { csrfFetch } from "./csrf";

const GET_EVENTS = 'event/getEvents'
const POST_EVENT = 'event/postEvent'

export const getEvents = (events) => {
    return { type: GET_EVENTS, events };
};

const postEvent = event => {
    return { type: POST_EVENT, event}
}

export const fetchEvents = () => async (dispatch) => {
    const res = await csrfFetch('/api/events')
    const events = await res.json();
    dispatch(getEvents(events))
}

export const createEvent = ( name, imgURL, venueId, groupId, description, date, capacity, userId) => async dispatch => {
    const payload = { name, imgURL, venueId, groupId, description, date, capacity, userId}
    const res = await csrfFetch('/api/events/new', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload) 
    });

    if (res.ok) {
        const event = await res.json();
        await dispatch(postEvent(event))
        return event;
    }
}

const eventReducer = ( state= { allEvents: {}, joined: {}}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_EVENTS:
            Object.values(action.events).forEach(event => {
                newState.allEvents[event.id] = event
            });
            return newState
        case POST_EVENT: 
            newState.allEvents[action.event.id] = action.event
            return newState;
        default: 
            return state;
    }
}

export default eventReducer
