import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GameCard from "./GameCard";
import CreateGame from "./CreateGame";
import * as actions from "../../redux/actions"


const Games = () => {

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(actions.getAllGames())
    }, [dispatch])

    let games = useSelector(state => state.games)
    let admin = useSelector(state => state.admin)

    const [create, setCreate] = React.useState(false)

    const handleCreate = () => {
        create ? setCreate(false) : setCreate(true)
    }


    return (
        <div>
            <h1 class="titleInit">JUEGOS</h1>
            {admin ? <button title={create ? "cerrar panel" : "Agregar Juego"} onClick={handleCreate}>{create ? "-" : "+"}</button> : false}
            {create ? <CreateGame /> : false}
            <div class="center">
            <div class="playerContainer">
            {games ? games.map(e => <GameCard
                name={e.name}
                image={e.image}
                id={e.id}
                type={e.type}
                playersNumber={e.playersNumber}
                teamsNumber={e.teamsNumber}
                description={e.description}
            />) : false}
            </div>
            </div>
        </div>
    )
}

export default Games