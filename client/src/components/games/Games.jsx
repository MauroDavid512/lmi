import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GameCard from "./GameCard";
import * as actions from "../../redux/actions"


const Games = () => {

    const dispatch = useDispatch()

    React.useEffect(()=> {
        dispatch(actions.getAllGames())
    },[dispatch])

    let games = useSelector(state => state.games)

    return (
        <div>
            {games?games.map(e => <GameCard
                name={e.name}
                image={e.image}
                id={e.id}
                playersNumber={e.playersNumber}
                teamsNumber={e.teamsNumber}
                description={e.description}
                 />):false}
        </div>
    )
}

export default Games