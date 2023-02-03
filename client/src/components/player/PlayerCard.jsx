import React from "react";
import { NavLink } from "react-router-dom"


const PlayerCard = (props) => {


    return (
        <NavLink class="decorationNone" to={`/lmi/player/${props.id}`}>
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src={props.image} alt={props.name} />
                        <p class="title">{props.name}</p>

                    </div>
                    <div class="flip-card-back">
                        <img src={props.image} alt={props.name} />
                        <p class="title">{props.name}</p>
                    </div>
                </div>
            </div>

        </NavLink>
    )
}

export default PlayerCard