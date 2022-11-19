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

    return (
        <div>
            {players?players.map(e => <PlayerCard name={e.name} image={e.image}/>):false}
        </div>
    )
}

export default Players