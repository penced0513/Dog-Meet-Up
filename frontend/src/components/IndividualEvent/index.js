import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink} from "react-router-dom"

import { fetchEvents, deleteEvent, getUserEvents, joinEvent, leaveEvent } from "../../store/eventReducer";
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
        document.getElementById("secondNavBarGroups").setAttribute("class", "passive")
        document.getElementById("secondNavBarEvents").setAttribute("class", "passive")
        dispatch(fetchEvents())
        dispatch(fetchVenues())
        if (sessionUser){
            dispatch(getUserGroups(sessionUser))
            dispatch(getUserEvents(sessionUser)).then( () => {
                if (sessionEvents[eventId]) {
                    setInEvent(true)
                } else {
                    setInEvent(false)
                }
            }) 

        }
    },[dispatch, sessionUser, eventId, sessionEvents])

    useEffect( () => {
        window.scrollTo(0, 0);
    }, [])

    
    let content = null

    const handleDelete = async() => {
        await dispatch(deleteEvent(eventId))
        history.push('/events')
    }
    const confirmDelete = <button className="button" onClick={handleDelete}>Yes</button>
    const cancelDelete = <button className="button" onClick={() => setShowDelete(false)}>Cancel</button>

    const joinEventButton = async() => {
        if (sessionUser) {
            await dispatch(joinEvent(sessionUser.id, eventId))
            setInEvent(true)
            dispatch(fetchEvents())
        } else {
            history.push('/login')
        }
    }

    const leaveEventButton = async() => {
        if (sessionUser) {
            await dispatch(leaveEvent(sessionUser.id, eventId))
            setInEvent(false)
            dispatch(fetchEvents())
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
                            <h3>{(event && (new Date(event.date).toString().slice(0,24)))}</h3>
                            <div className="event-host-group">
                                <p>{`Hosted By: `}</p> 
                                <NavLink className="group-hosted-by-link" to={`/groups/${event?.Group.id}`}>{event?.Group.name}</NavLink>
                            </div>
                            <div className="event-organized-user">
                                <p className="event-organized-by">{`Organized By:`}</p>
                                <p>{event?.Group.User.username}</p>
                            </div>

                        </div>
                        <div>
                            {(!inEvent || !sessionUser) && <button className="join-leave-group button" onClick={() => joinEventButton()}>Attend Event</button>}
                                    {((sessionUser?.id !== event?.hostId) && (inEvent && sessionUser)) && <button className="join-leave-group button" onClick={() => leaveEventButton()}>Leave Event</button>}
                            {sessionUser?.id === event?.hostId &&
                                    <div>
                                    <button className="button" onClick={() => setShowEditEventForm(true)}>Edit Event</button>
                                    <button className="button" onClick={() => setShowDelete(true) }>Delete Event</button>
                                {showDelete && <div><div>Are you sure you want to delete this event?</div>{confirmDelete}{cancelDelete}</div>}
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="event-page-bottom-half">
                    <div className="group-page-description">
                        <h2>What we're about</h2>
                        <p>{event?.description}</p>
                    </div>
                    <div>
                        <h2>Attendees ({event?.Rsvps.length})</h2>
                        {event?.Rsvps.map(rsvp => (
                            <div className="attendee "key={rsvp.id}>{rsvp.User.username}</div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="event-entire-page">
            {content}
        </div>
    )

}

export default IndividualEvent
