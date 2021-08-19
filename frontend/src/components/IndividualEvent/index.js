import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams} from "react-router-dom"

import { fetchEvents } from "../../store/eventReducer";
import { fetchVenues } from '../../store/venueRedurcer';
import  EditEventForm  from "../../components/EditEventForm"
import { getUserGroups } from '../../store/groupReducer'; 
import './IndividualEvent.css'

const IndividualEvent = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const {eventId} = useParams()
    const event = useSelector(state => state.event.allEvents[eventId])
    const [showEditEventForm, setShowEditEventForm] = useState(false)

    useEffect( () => {
        dispatch(fetchEvents())
        dispatch(fetchVenues())
        dispatch(getUserGroups(sessionUser))
    },[dispatch, sessionUser])

    let content = null

    if (showEditEventForm){
        content = (
            <EditEventForm event={event} hideForm={() => setShowEditEventForm(false)}/>
        )
    } else {
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
                    {sessionUser?.id === event?.hostId &&
                            <div>
                            <button onClick={() => setShowEditEventForm(true)}>Edit Event</button>
                            </div>
                    }
                </div>
                <div className="group-page-description">
                    <h2>What we're about</h2>
                    <p>{event?.description}</p>
                </div>
            </div>
        )
    }
    return (
        <div>
            {content}
        </div>
    )

}

export default IndividualEvent
