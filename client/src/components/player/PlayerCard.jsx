import React from "react";
import {NavLink} from "react-router-dom"


const PlayerCard = (props) => {


    return (
        <NavLink to={`/lmi/player/${props.id}`}>
            <div class="flip-card">
    <div class="flip-card-inner">
        <div class="flip-card-front">
        <img src={props.image} alt={props.name} />
            <p class="title">{props.name}</p>

        </div>
        <div class="flip-card-back">
            <p class="title">Acá va otra foto</p>
            <p>El nombre del equipo</p>
        </div>
    </div>
</div>

        </NavLink>
    )
}

export default PlayerCard