import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerCard from "./PlayerCard";
import * as actions from "../../redux/actions"
import CreatePlayer from "./CreatePlayer";


const Players = () => {

    const dispatch = useDispatch()

    React.useEffect(()=> {
        dispatch(actions.getAllPlayers())
    },[dispatch])

    let players = useSelector(state => state.players)
    let admin = useSelector(state => state.admin)

    const [create, setCreate] = React.useState(false)

    const handleCreate = () => {
        create?  setCreate(false) : setCreate(true)
    }

    return (
        <div>
            <h1>JUGADORES</h1>
            {admin ? <button title={create ? "cerrar panel" : "Agregar Jugador/a"} onClick={handleCreate}>{create ? "-" : "+"}</button> : false}
            {create ? <CreatePlayer/>:false}
            {players?players.map(e => <PlayerCard name={e.name} image={e.image} id={e.id}/>):false}
        </div>
    )
}

export default Players