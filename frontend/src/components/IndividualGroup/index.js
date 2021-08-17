// import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom"
import { fetchGroups } from "../../store/groupReducer";

import EditGroupForm from '../EditGroupForm'
import { deleteGroup } from "../../store/groupReducer";

const IndividualGroup = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const groups = useSelector(state => state.group)
    const {groupId} = useParams()
    const group = groups[groupId]
    const [showEditGroupForm, setShowEditGroupForm] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    useEffect( () => {
        dispatch(fetchGroups())
    }, [dispatch])

    let content = null

    const handleDelete = async() => {
        await dispatch(deleteGroup(groupId))
        history.push('/groups')
    }
    const confirmDelete = <button onClick={handleDelete}>Yes</button>
    const cancelDelete = <button onClick={() => setShowDelete(false)}>Cancel</button>

    if (showEditGroupForm){
        content = (
            <EditGroupForm group={group} hideForm={() => setShowEditGroupForm(false)}/>
        )
    } else {
        content = (
            <>
                <div>this is now the individual group page</div>
                <NavLink to="/groups">Back to Groups</NavLink>
                <div>Join/Leave Group (based on state variable? which checks if you are in or not)</div>
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
