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
    },[dispatch])

    let player = useSelector(state => state.playerDetail)

    return (
        <div>
            <img src={player.image} alt="" />
            <h1>{player.name}</h1>
            <h3>Cumpleañito: {player.birthday}</h3>
            <h3>Edad: {player.age}</h3>
            <h3>Descripción: {player.description}</h3>
        </div>
    )
}

export default PlayerDetail