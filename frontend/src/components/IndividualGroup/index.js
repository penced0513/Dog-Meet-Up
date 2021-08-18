// import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom"

import { fetchGroups } from "../../store/groupReducer";
import EditGroupForm from '../EditGroupForm'
import { deleteGroup, getUserGroups } from "../../store/groupReducer";

const IndividualGroup = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const sessionGroups = useSelector(state => state.group.joined)
    const groups = useSelector(state => state.group.allGroups)
    const {groupId} = useParams()
    const group = groups[groupId]
    const [showEditGroupForm, setShowEditGroupForm] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [inGroup, setInGroup] = useState('')

    useEffect( () => {
        dispatch(fetchGroups())
        if (sessionUser){
            dispatch(getUserGroups(sessionUser))
            if (sessionGroups[groupId]) {
                setInGroup(true)
            } else {
                setInGroup(false)
            }
        }
    }, [dispatch, sessionUser, groupId, sessionGroups])

    let content = null

    const handleDelete = async() => {
        await dispatch(deleteGroup(groupId))
        history.push('/groups')
    }
    const confirmDelete = <button onClick={handleDelete}>Yes</button>
    const cancelDelete = <button onClick={() => setShowDelete(false)}>Cancel</button>

    const joinGroup = async() => {
        // await dispatch(joinGroup(sessionUser.id, groupId))
        setInGroup(true)
    }

    const leaveGroup = async() => {
        // dispatch leave group
        setInGroup(false)
    }

    if (showEditGroupForm){
        content = (
            <EditGroupForm group={group} hideForm={() => setShowEditGroupForm(false)}/>
        )
    } else {
        content = (
            <>
                <div>this is now the individual group page</div>
                <NavLink to="/groups">Back to Groups</NavLink>
                <div>
                    <img src={group?.img} alt="group"></img>
                </div>
                <div>
                    <h3>{group?.name}</h3>
                    <p>{group?.description}</p>
                </div>
                <button onClick={() => setShowEditGroupForm(true)}>Edit Group</button>
                <button onClick={() => setShowDelete(true) }>Delete Group</button>
                {showDelete && <div><div>Are you sure you want to delete this group?</div>{confirmDelete}{cancelDelete}</div>}
                <div className="user-join-leave-btn-container">
                    {!inGroup && <button className="join-leave-group" onClick={joinGroup}>Join Group</button>}
                    {inGroup && <button className="join-leave-group" onClick={leaveGroup}>Leave Group</button>}
                </div>
            </>
        )
    }

    return (
        <div>
            {content}
        </div>
    )

}

export default IndividualGroup
