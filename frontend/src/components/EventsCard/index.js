import { NavLink, useHistory } from 'react-router-dom';
import './EventsCard.css';

const Card = ({event}) => {
    const history = useHistory()
    return (
        <div onClick={() => history.push(`/events/${event.id}`)}className="card-container">
            <div className="card-image-container">
                <img src={event.img} alt="event"></img>
            </div>
            <div className="card-information-container">
                <h4 className="event-card-date-header">{new Date(event.date).toString().slice(0,24)}</h4>
                <NavLink to={`/events/${event.id}`}>{event.name}</NavLink>
                <h3>{event.location}</h3>

                <p className="events-page-description">{event.description}</p>
                <h5 className="user-card-members">{`${event.Rsvps?.length} ${event.Rsvps?.length === 1 ? "attendee" : "attendees"}`}</h5>

            </div>
        </div>
    )
}

export default Card
