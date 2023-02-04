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
            <h1 class="titleInit">EQUIPOS</h1>
            {admin ? <button title={create ? "cerrar panel" : "Agregar Equipo"} onClick={handleCreate}>{create ? "-" : "+"}</button> : false}
            {create ? <CreateTeam/>:false}
            <div class="center">
            <div class="teamContainer">
            {team? team.map(e => <TeamCard name={e.name} image={e.image} id={e.id}/>):false}
            </div>
            </div>
        </div>
    )
}

export default Teams