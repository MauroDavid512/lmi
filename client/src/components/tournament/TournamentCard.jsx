import React from "react";


const TournamentCard = (props) => {


    return (
        <div>
            {props.name}
            <br />
            <img src={props.image} alt={props.name} />
        </div>
    )
}

export default TournamentCard