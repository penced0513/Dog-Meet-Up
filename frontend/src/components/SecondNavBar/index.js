import { NavLink  } from 'react-router-dom';
import './secondNavBar.css'

export default function SecondNavBar () {

    return (
        <div className="second-navbar-container">
            <NavLink id="secondNavBarGroups" to="/groups">Groups</NavLink>
            <NavLink id="secondNavBarEvents" to="/events">Events</NavLink>
        </div>
    )
}
