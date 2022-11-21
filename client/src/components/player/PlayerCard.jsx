import React from "react";
import {NavLink} from "react-router-dom"


const PlayerCard = (props) => {


    return (
        <NavLink to={`/lmi/player/${props.id}`}>
        <div>
            {props.name}
            <br />
            <img src={props.image} alt={props.name} />
        </div>
        </NavLink>
    )
}

export default PlayerCard