import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom"

import Card from '../EventsCard'
import EditGroupForm from '../EditGroupForm'
import { fetchGroups, deleteGroup, getUserGroups, joinGroup, leaveGroup } from "../../store/groupReducer";
import { fetchEvents } from "../../store/eventReducer";
import './individualGroup.css'


const IndividualGroup = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const sessionGroups = useSelector(state => state.group.joined)
    const {groupId} = useParams()
    const groupEvents = useSelector(state => Object.values(state.event.allEvents).filter(event => event.categoryId === Number(groupId)).sort((a,b) => {
        if (a.date < b.date) return -1
        return 1
    }))
    const group = useSelector(state => state.group.allGroups[groupId])
    const [showEditGroupForm, setShowEditGroupForm] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    useEffect( () => {
        document.getElementById("secondNavBarGroups").setAttribute("class", "passive")
        document.getElementById("secondNavBarEvents").setAttribute("class", "passive")
        dispatch(fetchGroups())
        dispatch(fetchEvents())
        if (sessionUser) dispatch(getUserGroups(sessionUser))
    },[dispatch, sessionUser])

    let content = null

    const handleDelete = async() => {
        await dispatch(deleteGroup(groupId));
        history.push('/groups')
        

    }

    const confirmDelete = <button className="button" onClick={handleDelete}>Yes</button>
    const cancelDelete = <button className="button" onClick={() => setShowDelete(false)}>Cancel</button>

    const joinGroupButton = async() => {
        if (sessionUser) {
            await dispatch(joinGroup(sessionUser.id, groupId))
        } else {
            history.push('/login')
        }
    }

    const leaveGroupButton = async() => {
        if (sessionUser) {
            await dispatch(leaveGroup(sessionUser.id, groupId))
        } else {
            history.push('/login')
        }
    }

    if (showEditGroupForm){
        content = (
            <EditGroupForm group={group} hideForm={() => setShowEditGroupForm(false)}/>
        )
    } else {
        content = (
            <div className="group-page-container">
                <div className="group-info-container">
                    <div>
                        <img className="group-img" src={group?.img} alt="group"></img>
                    </div>
                    <div className="group-info-right-side">
                        <div className="group-name-location">
                            <h1 className="group-page-name">{group?.name}</h1>
                            <h3 className="group-page-location">{group?.location}</h3>
                            <h5 className="user-card-members">{`${group?.joinedGroups?.length} ${group?.joinedGroups?.length === 1 ? "member" : "members"}`}</h5>
                            <h4>{`Created by: ${group?.User.username}`}</h4>
                        </div>
                        <div className="user-join-leave-btn-container">
                            {(!sessionGroups?.[groupId]|| !sessionUser) && <button className="join-leave-group button" onClick={() => joinGroupButton()}>Join Group</button>}
                            {((sessionUser?.id !== group?.organizer) && (sessionGroups?.[groupId] && sessionUser)) && <button className="join-leave-group button" onClick={() => leaveGroupButton()}>Leave Group</button>}
                            {sessionUser?.id === group?.organizer &&
                            <div>
                            <button className="button" onClick={() => setShowEditGroupForm(true)}>Edit Group</button>
                            <button className="button" onClick={() => setShowDelete(true) }>Delete Group</button>
                            {showDelete && <div><div>Are you sure you want to delete this group?</div>{confirmDelete}{cancelDelete}</div>}
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="group-bottom-half-container">
                    <div className="group-page-description">
                        <h2>What we're about</h2>
                        <p>{group?.description}</p>
                    </div>
                    <div>
                        <h2>Upcoming Events</h2>
                        <div>
                        {groupEvents?.slice(0,5).map(event => (
                            <div key={event.id} className="group-page-events" >
                                <Card event={event} ></Card>
                            </div>
                        ))}     
                        </div>
                    </div>
                </div>


            </div>
        )
    }

    return (
        <div className="entire-group-page">
            {content}
        </div>
    )

}

export default IndividualGroup
