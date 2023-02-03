import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions"
import { NavLink } from "react-router-dom"


const PlayerCard = (props) => {

    const dispatch = useDispatch()

    React.useEffect(()=> {
        dispatch(actions.getAllPlayers())
    },[dispatch])
    
    let admin = useSelector(state => state.admin)

    const[question, setQuestion] = React.useState(false)

    const handleQuestion = (e,bool) => {
        e.preventDefault()
        setQuestion(bool)
    }

    const handleDelete = (e,id) => {
        e.preventDefault()
        dispatch(actions.deletePlayer(id))
        dispatch(actions.getAllPlayers())
    }

    return (
        <div>
            {admin?<button class="deletePlayer" title="Eliminar jugador" onClick={e=>handleQuestion(e,true)}>❌</button>:false}
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
        {question?<div class="questionContainer"><div class="question"> ¿Eliminar a {props.name} de la base de datos? </div> <button class="margin" onClick={e=>handleQuestion(e,false)}>Cancelar</button> <button class="margin" onClick={e=>handleDelete(e,props.id)}>Eliminar</button></div> : false}
        </div>
    )
}

export default PlayerCard