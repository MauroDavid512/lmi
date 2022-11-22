import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TeamCard from "./TeamCard";
import * as actions from '../../redux/actions'

const Teams = () => {

    const dispatch = useDispatch()

    React.useEffect(()=> {
        dispatch(actions.getAllTeams())
    },[dispatch])

    let team = useSelector(state => state.teams)

    return (
        <div>
            <h1>EQUIPOS</h1>
            {team? team.map(e => <TeamCard name={e.name} image={e.image} id={e.id}/>):false}
        </div>
    )
}

export default Teams