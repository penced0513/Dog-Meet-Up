import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { getUserGroups, fetchGroups } from '../../store/groupReducer'; 
import { getUserEvents } from "../../store/eventReducer";
import Card from '../EventsCard'
import GroupCard from '../GroupsCard'


export default function HomePage () {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const events = useSelector(state => state.event.allEvents)
    const groups = useSelector(state => state.group.allGroups)
    console.log('groups', groups)
    const sessionEvents = useSelector(state => Object.values(state.event.joined))
    const sessionGroups = useSelector(state => Object.values(state.group.joined))
    console.log(sessionGroups)
    
    useEffect( () => {
        dispatch(getUserGroups(sessionUser))
        dispatch(getUserEvents(sessionUser))
    },[dispatch])
    if (!sessionUser) {
        return <Redirect to="/" />
    }
    return (
        <div>
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
