import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory} from "react-router-dom"

import { fetchEvents, deleteEvent, getUserEvents, joinEvent } from "../../store/eventReducer";
import { fetchVenues } from '../../store/venueRedurcer';
import  EditEventForm  from "../../components/EditEventForm"
import { getUserGroups } from '../../store/groupReducer'; 
import './IndividualEvent.css'

const IndividualEvent = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const sessionEvents = useSelector(state => state.event.joined)
    const {eventId} = useParams()
    const event = useSelector(state => state.event.allEvents[eventId])
    const [showEditEventForm, setShowEditEventForm] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [inEvent, setInEvent] = useState('')

    useEffect( () => {
        dispatch(fetchEvents())
        dispatch(fetchVenues())
        dispatch(getUserGroups(sessionUser)).then( () => {
            if (sessionUser){
                dispatch(getUserEvents(sessionUser)).then( () => {
                    if (sessionEvents[eventId]) {
                        setInEvent(true)
                    } else {
                        setInEvent(false)
                    }
                }) 
            }
        })
    },[dispatch, sessionUser])

    let content = null

    const handleDelete = async() => {
        await dispatch(deleteEvent(eventId))
        history.push('/events')
    }
    const confirmDelete = <button onClick={handleDelete}>Yes</button>
    const cancelDelete = <button onClick={() => setShowDelete(false)}>Cancel</button>

    const joinEventButton = async() => {
        if (sessionUser) {
            await dispatch(joinEvent(sessionUser.id, eventId))
            setInEvent(true)
        } else {
            history.push('/login')
        }
    }

    const leaveEventButton = async() => {
        if (sessionUser) {
            // await dispatch(leaveEvent(sessionUser.id, eventId))
            setInEvent(false)
        } else {
            history.push('/login')
        }
    }

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
                            <h3>{(event && (new Date(event.date)).toString())}</h3>
                        </div>
                    </div>
                    <div>
                        {(!inEvent || !sessionUser) && <button className="join-leave-group" onClick={() => joinEventButton()}>Join Event</button>}
                                {((sessionUser?.id !== event?.hostId) && (inEvent && sessionUser)) && <button className="join-leave-group" onClick={() => leaveEventButton()}>Leave Event</button>}
                        {sessionUser?.id === event?.hostId &&
                                <div>
                                <button onClick={() => setShowEditEventForm(true)}>Edit Event</button>
                                <button onClick={() => setShowDelete(true) }>Delete Event</button>
                            {showDelete && <div><div>Are you sure you want to delete this event?</div>{confirmDelete}{cancelDelete}</div>}
                                </div>
                        }
                    </div>
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
