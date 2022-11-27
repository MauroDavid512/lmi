import React from "react";
import {NavLink} from "react-router-dom"


const GameCard = (props) => {


    return (
        <div>
            {props.name}
            <br />
            <img src={props.image} alt={props.name} />
            <br />
            <b>Improvisación de tipo {props.type}</b>
            <br />
            <b>Cantidad de jugadores: </b>{props.playersNumber}
            <br />
            <b>Equipos: </b>{props.teamsNumber}
            <br />
            <b>¿Cómo se juega</b>
            <br />
            {props.description}
        </div>
    )
}

export default GameCard