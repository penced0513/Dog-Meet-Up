import { NavLink  } from 'react-router-dom';

export default function SecondNavBar () {

    return (
        <div>
            <NavLink to="/groups">Groups</NavLink>
            <NavLink to="/events">Events</NavLink>
        </div>
    )
}
