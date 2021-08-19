import { csrfFetch } from "./csrf";

const GET_VENUES = 'group/getVenues'

export const getVenues = (venues) => {
    return { type: GET_VENUES, venues };
};

export const fetchVenues = () => async (dispatch) => {
    const res = await csrfFetch('/api/venues')
    const venues = await res.json();
    dispatch(getVenues(venues))
}

const venueReducer = ( state = {}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_VENUES:
            Object.values(action.venues).forEach(venue => {
                newState[venue.id] = venue
            });
            return newState
        default: 
            return state;
    }
}

export default venueReducer
