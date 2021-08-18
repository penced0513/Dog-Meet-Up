import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom"

import { fetchEvents } from "../../store/eventReducer";
// import EditGroupForm from '../EditGroupForm'
// import { deleteGroup, getUserGroups, joinGroup, leaveGroup } from "../../store/groupReducer";
import './IndividualEvent.css'

const IndividualEvent = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    // const sessionGroups = useSelector(state => state.group.joined)
    const {eventId} = useParams()
    const event = useSelector(state => state.event.allEvents[eventId])
    // const [showEditGroupForm, setShowEditGroupForm] = useState(false)
    // const [showDelete, setShowDelete] = useState(false)
    // const [inGroup, setInGroup] = useState('')

    useEffect( () => {
        dispatch(fetchEvents())
        // .then( () =>{
            // if (sessionUser){
            //     dispatch(getUserGroups(sessionUser)).then( () => {
            //         if (sessionGroups[groupId]) {
            //             setInGroup(true)
            //         } else {
            //             setInGroup(false)
            //         }
            //     }) 
            // }
        // })
    },[dispatch,])

    let content = null

    // const handleDelete = async() => {
    //     await dispatch(deleteGroup(groupId))
    //     history.push('/groups')
    // }
    // const confirmDelete = <button onClick={handleDelete}>Yes</button>
    // const cancelDelete = <button onClick={() => setShowDelete(false)}>Cancel</button>

    // const joinGroupButton = async() => {
    //     if (sessionUser) {
    //         await dispatch(joinGroup(sessionUser.id, groupId))
    //         setInGroup(true)
    //     } else {
    //         history.push('/login')
    //     }
    // }

    // const leaveGroupButton = async() => {
    //     if (sessionUser) {
    //         await dispatch(leaveGroup(sessionUser.id, groupId))
    //         setInGroup(false)
    //     } else {
    //         history.push('/login')
    //     }
    // }

    // if (showEditGroupForm){
    //     content = (
    //         <EditGroupForm group={group} hideForm={() => setShowEditGroupForm(false)}/>
    //     )
    // } else {
        content = (
            <div className="group-page-container">
                <div className="group-info-container">
                    <div>
                        <img className="group-img" src={event?.img} alt="event"></img>
                    </div>
                    <div className="group-info-right-side">
                        <div className="group-name-location">
                            <h1>{event?.name}</h1>
                            <h3>{event?.location}</h3>
                        </div>
                        {/* <div className="user-join-leave-btn-container">
                            {(!inGroup || !sessionUser) && <button className="join-leave-group" onClick={() => joinGroupButton()}>Join Group</button>}
                            {inGroup && sessionUser && <button className="join-leave-group" onClick={() => leaveGroupButton()}>Leave Group</button>}
                            {sessionUser?.id === group?.organizer &&
                            <div>
                            <button onClick={() => setShowEditGroupForm(true)}>Edit Group</button>
                            <button onClick={() => setShowDelete(true) }>Delete Group</button>
                            {showDelete && <div><div>Are you sure you want to delete this group?</div>{confirmDelete}{cancelDelete}</div>}
                            </div>}
                        </div> */}
                    </div>
                </div>
                <div className="group-page-description">
                    <h2>What we're about</h2>
                    <p>{event?.description}</p>
                </div>
                <div>Todo... add events on this page</div>


            </div>
        )
    // }

    return (
        <div>
            {content}
        </div>
    )

}

export default IndividualEvent
