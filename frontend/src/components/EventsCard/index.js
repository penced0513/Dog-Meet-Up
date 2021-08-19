import { NavLink } from 'react-router-dom';
import './EventsCard.css';

const Card = ({event}) => {
    return (
        <div className="card-container">
            <div className="card-image-container">
                <img src={event.img} alt="event"></img>
            </div>
            <div className="card-information-container">
                <NavLink to={`/events/${event.id}`}>{event.name}</NavLink>
                <h3>{event.location}</h3>

                <p className="events-page-description">{event.description}</p>

            </div>
        </div>
    )
}

export default Card
