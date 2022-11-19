import React from "react";


const PlayerCard = (props) => {


    return (
        <div>
            {props.name}
            <br />
            <img src={props.image} alt={props.name} />
        </div>
    )
}

export default PlayerCard