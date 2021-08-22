import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { fetchGroups } from "../../store/groupReducer";
import GroupCard from '../GroupsCard'
import './groupsPage.css';

export default function GroupsPage () {
    const dispatch = useDispatch()
    
    const groups = useSelector((state) => Object.values(state.group.allGroups))
    const sessionUser = useSelector((state) => state.session.user)

    useEffect( () => {
        dispatch(fetchGroups())
        document.getElementById("secondNavBarGroups").setAttribute("class", "selected")
        document.getElementById("secondNavBarEvents").setAttribute("class", "passive")
    }, [dispatch])

    return (
        <div className="groups-page-container">
            <NavLink className="bold-nav-links start-a-group" to={sessionUser ? "/groups/new" : "/login"}>Start a Group</NavLink>
            { groups.map(group => {
                return <GroupCard group={group} key={group.id}></GroupCard>
            })}
        </div>
    )
}
