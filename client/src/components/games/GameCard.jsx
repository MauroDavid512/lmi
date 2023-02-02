import React from "react";
import {NavLink} from "react-router-dom"


const GameCard = (props) => {


    return (
        <div class="gameCard">
            <img class="imggame" src={props.image} alt={props.name} />
            <br />
            <div>
            <div class="tituloJuegos">{props.name}</div>
            <br />
           
            <b>Improvisación de tipo {props.type}</b>
            <br />
            <b>Cantidad de jugadores: </b>{props.playersNumber}
            <br />
            <b>Equipos: </b>{props.teamsNumber}
            <br />
            <b>¿Cómo se juega?</b>
            <br />
            <div class="description">{props.description}</div>
            </div>
        </div>
    )
}

export default GameCard