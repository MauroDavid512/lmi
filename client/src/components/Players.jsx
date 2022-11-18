import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerCard from "./PlayerCard";
import * as actions from "../redux/actions"


const Players = () => {

    const dispatch = useDispatch()

    React.useEffect(()=> {
        dispatch(actions.getAllPlayers())
    })

    let players = useSelector(state => state.players)
    console.log(players)

    return (
        <div>
            {players.map(e => <PlayerCard name={e.name} image={e.image}/>)}
        </div>
    )
}

export default Players