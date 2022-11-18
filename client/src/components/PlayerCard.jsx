import React from "react";


const PlayerCard = (props) => {


    return (
        <div>
            {props.name}
            <br />
            {props.image}
        </div>
    )
}

export default PlayerCard