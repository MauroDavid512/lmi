import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions"


const TeamDetail = () => {
    let params = useParams()
    let dispatch = useDispatch()
    let id = params.id

    React.useEffect(() => {
        dispatch(actions.getTeamDetail(id))
    }, [dispatch])

    let team = useSelector(state => state.teamDetail)

    return (
        <div>
            <img src={team.image} alt="" />
            <h1>{team.name}</h1>
            <h2>{team.description}</h2>
        </div>
    )
}

export default TeamDetail