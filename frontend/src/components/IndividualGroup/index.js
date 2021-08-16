// import { NavLink } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchGroups } from "../../store/groupReducer";

const IndividualGroup = () => {
    const dispatch = useDispatch()
    const groups = useSelector(state => state.group)
    const {groupId} = useParams()
    const group = groups[groupId]
    useEffect( () => {
        dispatch(fetchGroups())
    }, [dispatch])

    return (
        <div>
            <div>this is now the individual group page</div>
            <div>
                <img src={group?.img} alt="group"></img>
            </div>
            <div>
                <h3>{group?.name}</h3>
                <p>{group?.description}</p>
            </div>
        </div>
    )

}

export default IndividualGroup
