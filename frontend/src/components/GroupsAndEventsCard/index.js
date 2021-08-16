import { NavLink } from 'react-router-dom';

const Card = ({group}) => {
    return (
        <div>
            <div>
                <img src={group.img} alt="group"></img>
            </div>
            <div>
                <NavLink to={`/groups/${group.id}`}>{group.name}</NavLink>
                <h3>{group.location}</h3>
                <p>{group.description}</p>
            </div>
        </div>
    )

}

export default Card
