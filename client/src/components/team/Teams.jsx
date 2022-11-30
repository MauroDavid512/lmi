import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TeamCard from "./TeamCard";
import CreateTeam from "./CreateTeam";
import * as actions from '../../redux/actions'

const Teams = () => {

    const dispatch = useDispatch()

    React.useEffect(()=> {
        dispatch(actions.getAllTeams())
    },[dispatch])

    let team = useSelector(state => state.teams)
    let admin = useSelector(state => state.admin)

    const [create, setCreate] = React.useState(false)

    const handleCreate = () => {
        create?  setCreate(false) : setCreate(true)
    }



    return (
        <div>
            <h1>EQUIPOS</h1>
            {admin ? <button title={create ? "cerrar panel" : "Agregar Jugador/a"} onClick={handleCreate}>{create ? "-" : "+"}</button> : false}
            {create ? <CreateTeam/>:false}
            {team? team.map(e => <TeamCard name={e.name} image={e.image} id={e.id}/>):false}
        </div>
    )
}

export default Teams