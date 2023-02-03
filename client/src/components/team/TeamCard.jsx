import React from "react";
import { Link } from "react-router-dom";


const TeamCard = (props) => {


    return (
        <Link class="decorationNone" to={`/lmi/team/${props.id}`} >
            <div class="teamCard">

                <br />
                <img class="imageTeamCard" src={props.image} alt={props.name} />
                <br />
                <div class="title">{props.name}</div>
            </div>
        </Link>
    )
}

export default TeamCard