import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/actions"
import { NavLink, useParams } from 'react-router-dom';

const PlayerDetail = () => {
    let params = useParams()
    let id = params.id
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(actions.getPlayerDetail(id))
        dispatch(actions.getAllTeams())
    },[dispatch])

    let player = useSelector(state => state.playerDetail)
    let teams = useSelector(state => state.teams)
console.log('aklkgpkajmgpagj '+teams[0].name)
    let playerTeams = []
    for(let i = 0; i<teams.length; i++){

        teams[i].players.forEach(element => {
            if(element.id === id){
                playerTeams.push(teams[i].players)
            }
        });
    }
    return (
        <div>
            <img src={player.image} alt="" />
            <h1>{player.name}</h1>
            <h3>Cumpleañito: {player.birthday}</h3>
            <h3>Edad: {player.age}</h3>
            <h3>Descripción: {player.description}</h3>

            equipos:
            {playerTeams.map(e => e.name)}

        </div>
    )
}

export default PlayerDetail