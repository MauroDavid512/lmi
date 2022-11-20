import React from "react";
import { Link } from "react-router-dom";


const TeamCard = (props) => {


    return (
        <Link to={`/lmi/team/${props.id}`} >
        <div>
            {props.name}
            <br />
            <img src={props.image} alt={props.name} />
        </div>
        </Link>
    )
}

export default TeamCard