import { NavLink, useHistory } from 'react-router-dom';
import './GroupsCard.css';

const Card = ({group}) => {
    const history = useHistory()
    return (
        <div onClick={() => history.push(`/groups/${group.id}`)} className="card-container">
            <div className="card-image-container">
                <img src={group.img} alt="group"></img>
            </div>
            <div className="card-information-container">
                <NavLink to={`/groups/${group.id}`}>{group.name}</NavLink>
                <h4>{group.location}</h4>
                <p className="groups-page-description">{group.description}</p>
                <h5 className="user-card-members">{`${group.joinedGroups?.length} ${group.joinedGroups?.length === 1 ? "member" : "members"}`}</h5>
            </div>
        </div>
    )
}

export default Card
