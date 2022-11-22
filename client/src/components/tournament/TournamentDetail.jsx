import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions"

const TournamentDetail = () => {
    let params = useParams()
    let dispatch = useDispatch()
    let id = params.id

    React.useEffect(() => {
        dispatch(actions.getTournamentDetail(id))
    }, [dispatch])

    let tournament = useSelector(state => state.tournamentDetail)

    return (
        <div>
            <img src={tournament.image} alt="" />
            <h1>{tournament.name}</h1>
            <h2>{tournament.description}</h2>

            <br />
            <b>Equipos que participaron</b>
            <br />
            {tournament.teams ? 
                tournament.teams.map(e => <NavLink to={`/lmi/team/${e.id}`}>
                    <b>{e.name}</b>
                    <br />
                </NavLink>)
            : false }
        </div>
    )
}

export default TournamentDetail