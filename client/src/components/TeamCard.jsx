import React from "react";


const TeamCard = (props) => {


    return (
        <div>
            {props.name}
            <br />
            <img src={props.image} alt={props.name} />
        </div>
    )
}

export default TeamCard