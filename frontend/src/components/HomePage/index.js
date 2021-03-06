import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { getUserGroups } from '../../store/groupReducer'; 
import { getUserEvents } from "../../store/eventReducer";
import Card from '../EventsCard'
import GroupCard from '../GroupsCard'
import './HomePage.css'


export default function HomePage () {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const sessionEvents = useSelector(state => Object.values(state.event.joined))
    const sessionGroups = useSelector(state => Object.values(state.group.joined))

    
    useEffect( () => {
        document.getElementById("secondNavBarGroups").setAttribute("class", "passive")
        document.getElementById("secondNavBarEvents").setAttribute("class", "passive")
        if(sessionUser) {
            dispatch(getUserGroups(sessionUser))
            dispatch(getUserEvents(sessionUser))
        }
    },[dispatch, sessionUser])
    if (!sessionUser) {
        return <Redirect to="/" />
    }

    return (
        <div className="home-page-container">
            <div>
                <h2>Your Groups</h2>
                    {sessionGroups.map(group => (
                        <GroupCard group={group} key={group.id}></GroupCard>
                    ))}
            </div>
            <div>
                <h2>Your Events</h2>
                {sessionEvents.map(event => (
                    <Card event={event} key={event.id}></Card>
                ))}
            </div>
        </div>
    )
}
