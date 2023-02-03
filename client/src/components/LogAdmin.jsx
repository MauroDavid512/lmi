import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions"


const LogAdmin = () => {

    let dispatch = useDispatch()

    let admin = useSelector(state => state.admin)

    const [input, setInput] = React.useState({
        adminButton: false,
        holder: ""
    })

    const handleAdminButton = () => {
        input.adminButton == false ? 
        setInput({
            ...input,
            adminButton: true
        }) :
        setInput({
            ...input,
            adminButton: false
        })
    }

    const handleHolder = (e) => {
        setInput({
            ...input,
            holder: e.target.value
        })
    }

    const handleLogIn = () => {
        if (input.holder === "liganeta2022"){
            dispatch(actions.adminOn())
        }
    }

    const handleLogOut = () => {
        dispatch(actions.adminOff())
        setInput({
            ...input,
            holder: ""
        })
    }

    return (
        <div class="logAdmin">
        {!admin?<button class="" onClick={handleAdminButton}>Admin</button>:false}
            {input.adminButton && !admin ? <div>
                <input type="password" class="input" placeholder="Código" onChange={e => handleHolder(e)} value={input.holder}/>
                <button onClick={handleLogIn}>Entrar</button>
                </div> : false}
            {admin ? <div class="logAdminOn"><p class="adminOn">Admin On</p><br /><button onClick={handleLogOut}>Salir</button></div>: false}
        </div>
    )
}

export default LogAdmin