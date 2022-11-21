import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TournamentCard from "./TournamentCard";
import * as actions from '../../redux/actions'

const Tournaments = () => {


    const dispatch = useDispatch()

    React.useEffect(()=> {
        dispatch(actions.getAllTournaments())
    },[dispatch])

    let tournaments = useSelector(state => state.tournaments)

    return (
        <div>
            {tournaments?tournaments.map(e => <TournamentCard name={e.name} image={e.image} id={e.id}/>):false}
        </div>
    )
}

export default Tournaments