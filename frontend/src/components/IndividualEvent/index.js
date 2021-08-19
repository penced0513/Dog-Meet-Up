import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom"

import { fetchEvents } from "../../store/eventReducer";
import './IndividualEvent.css'

const IndividualEvent = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const {eventId} = useParams()
    const event = useSelector(state => state.event.allEvents[eventId])
    useEffect( () => {
        dispatch(fetchEvents())
    },[dispatch,])

    let content = null

        content = (
            <div className="group-page-container">
                <div className="group-info-container">
                    <div>
                        <img className="group-img" src={event?.img} alt="event"></img>
                    </div>
                    <div className="group-info-right-side">
                        <div className="group-name-location">
                            <h1>{event?.name}</h1>
                            <h3>{event?.location}</h3>
                        </div>
                    </div>
                </div>
                <div className="group-page-description">
                    <h2>What we're about</h2>
                    <p>{event?.description}</p>
                </div>
            </div>
        )
    return (
        <div>
            {content}
        </div>
    )

}

export default IndividualEvent
