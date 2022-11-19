import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TournamentCard from "./TournamentCard";
import * as actions from '../redux/actions'

const Tournaments = () => {


    const dispatch = useDispatch()

    React.useEffect(()=> {
        dispatch(actions.getAllTournaments())
    })

    let Tournaments = useSelector(state => state.Tournaments)
    console.log(Tournaments)

    return (
        <div>
            {Tournaments?Tournaments.map(e => <TournamentCard name={e.name} image={e.image}/>):false}
        </div>
    )
}

export default Tournaments