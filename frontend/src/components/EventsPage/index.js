import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { fetchEvents } from "../../store/eventReducer";
import Card from '../EventsCard'


export default function EventsPage () {
    const dispatch = useDispatch()
    
    const sessionUser = useSelector(state => state.session.user)
    const events = useSelector((state) => Object.values(state.event.allEvents).sort((a,b) => {
        if (a.date < b.date) return -1
        return 1
    }))

    useEffect( () => {
        dispatch(fetchEvents())
        document.getElementById("secondNavBarGroups").setAttribute("class", "passive")
        document.getElementById("secondNavBarEvents").setAttribute("class", "selected")
    }, [dispatch])
    
    return (
        <div className="groups-page-container">
            <NavLink className="bold-nav-links start-a-group" to={sessionUser ? "/events/new" : "/login"}>Host an event</NavLink>
            { events.map(event => {
                return <Card event={event} key={event.id}></Card>
            })}
        </div>
    )
}
