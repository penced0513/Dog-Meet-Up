import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchGroups } from "../../store/groupReducer";
import GroupCard from '../GroupsCard'
import './groupsPage.css';

export default function GroupsPage () {
    const dispatch = useDispatch()
    
    const groups = useSelector((state) => Object.values(state.group.allGroups))

    useEffect( () => {
        dispatch(fetchGroups())
        document.getElementById("secondNavBarGroups").setAttribute("class", "active")
        document.getElementById("secondNavBarEvents").setAttribute("class", "passive")
    }, [dispatch])

    useEffect(() => {
        
    })

    return (
        <div className="groups-page-container">
            { groups.map(group => {
                return <GroupCard group={group} key={group.id}></GroupCard>
            })}
        </div>
    )
}
