import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/actions"
import { NavLink } from 'react-router-dom';

const PlayerDetail = (props) => {
    let id = props.match.params.id
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(actions.getPlayerDetail(id))
    })


    



    return (
        <div>
            <img src={props.image} alt="" />
            <h1>{props.name}</h1>
            <h3>Cumpleañito: {props.birthday}</h3>
            <h3>Edad: {props.age}</h3>
            <h3>Descripción: {props.description}</h3>

            
        </div>
    )
}

export default PlayerDetail