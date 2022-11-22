import React from "react";
import { NavLink } from "react-router-dom";

const TournamentCard = (props) => {


    return (
        <div>
            <NavLink to= {`/lmi/tournament/${props.id}`} >
            {props.name}
            <br />
            <img src={props.image} alt={props.name} />
            </NavLink>
        </div>
    )
}

export default TournamentCard