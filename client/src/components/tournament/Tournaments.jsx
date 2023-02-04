import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TournamentCard from "./TournamentCard";
import * as actions from '../../redux/actions'
import CreateTournament from "./CreateTournament";

const Tournaments = () => {


    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(actions.getAllTournaments())
    }, [dispatch])

    let tournaments = useSelector(state => state.tournaments)
    let admin = useSelector(state => state.admin)

    const [create, setCreate] = React.useState(false)

    const handleCreate = () => {
        create?  setCreate(false) : setCreate(true)
    }


    return (
        <div>
            <h1 class="titleInit">TORNEOS</h1>
            {admin ? <button title={create ? "cerrar panel" : "Agregar Equipo"} onClick={handleCreate}>{create ? "-" : "+"}</button> : false}
            {create ? <CreateTournament/>:false}
            {tournaments ? tournaments.map(e => <TournamentCard name={e.name} image={e.image} id={e.id} />) : false}
        </div>
    )
}

export default Tournaments