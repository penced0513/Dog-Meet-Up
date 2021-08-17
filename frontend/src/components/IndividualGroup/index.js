// import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom"
import { fetchGroups } from "../../store/groupReducer";

import EditGroupForm from '../EditGroupForm'

const IndividualGroup = () => {
    const dispatch = useDispatch()
    const groups = useSelector(state => state.group)
    const {groupId} = useParams()
    const group = groups[groupId]
    const [showEditGroupForm, setShowEditGroupForm] = useState(false)

    useEffect( () => {
        dispatch(fetchGroups())
    }, [dispatch])

    let content = null

    if (showEditGroupForm){
        content = (
            <EditGroupForm />
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
                <button onClick={() => setShowEditGroupForm(true)}>
                        Edit Group</button>
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
