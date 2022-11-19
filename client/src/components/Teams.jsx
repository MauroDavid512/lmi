import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TeamCard from "./TeamCard";
import * as actions from '../redux/actions'

const Teams = () => {


    const dispatch = useDispatch()

    React.useEffect(()=> {
        dispatch(actions.getAllTeams())
    })

    let team = useSelector(state => state.team)
    console.log(team)

    return (
        <div>
            {team? team.map(e => <TeamCard name={e.name} image={e.image}/>):false}
        </div>
    )
}

export default Teams