import { csrfFetch } from "./csrf";

const GET_EVENTS = 'event/getEvents'
const POST_EVENT = 'event/postEvent'
const PUT_EVENT = 'event/putEvent'
const DELETE_EVENT = 'event/deleteEvent'

export const getEvents = (events) => {
    return { type: GET_EVENTS, events };
};

const postEvent = event => {
    return { type: POST_EVENT, event}
}

const putEvent = event => {
    return { type: PUT_EVENT, event}
}

const destroyEvent= eventId => {
    return { type: DELETE_EVENT, eventId}
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

export const editEvent = (name, eventId, imgURL, venueId, groupId, description, date, capacity, userId) => async dispatch => {
    const payload = {name, eventId, imgURL, venueId, groupId, description, date, capacity, userId}
    const res = await csrfFetch(`/api/events/${eventId}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload) 
    });

    if (res.ok) {
        const event = await res.json();
        await dispatch(putEvent(event))
        return event;
    }
}

export const deleteEvent = (eventId) => async dispatch => {

    const res = await csrfFetch(`/api/events/${eventId}`, {
        method: 'delete',
    });

    if (res.ok) {
        await dispatch(destroyEvent(eventId))
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
        case PUT_EVENT: 
            newState.allEvents[action.event.id] = action.event
            return newState;
        case DELETE_EVENT:
            delete newState.allEvents[action.eventId]
            return newState
        default: 
            return state;
    }
}

export default eventReducer
