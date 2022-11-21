import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions"
import PlayerCard from "../player/PlayerCard"


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

            <h3>Jugadores:</h3>
            <br />
            {team.players? team.players.map(e => <PlayerCard id={e.id} name={e.name} image={e.image} />) : false}
        </div>
    )
}

export default TeamDetail