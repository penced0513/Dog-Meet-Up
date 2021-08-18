import { NavLink } from 'react-router-dom';
import './Card.css';

const Card = ({group}) => {
    return (
        <div className="card-container">
            <div className="card-image-container">
                <img src={group.img} alt="group"></img>
            </div>
            <div className="card-information-container">
                <NavLink to={`/groups/${group.id}`}>{group.name}</NavLink>
                <h3>{group.location}</h3>

                <p className="groups-page-description">{group.description}</p>

            </div>
        </div>
    )

}

export default Card
