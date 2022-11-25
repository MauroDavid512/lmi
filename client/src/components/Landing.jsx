import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions"
import "./Styles/styles.css"
import { Link } from "react-router-dom";


const Landing = () => {

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


    return (
        <div>
            <button onClick={handleAdminButton}>admin</button>
            {input.adminButton && !admin ? <div>
                <input type="text" placeholder="Código" onChange={e => handleHolder(e)} value={input.holder}/>
                <button onClick={handleLogIn}>Entrar</button>
                </div> : false}
            {admin ? <p>Perfil administrativo activo</p>: false}
            <h1>Bienvenid@ al sitio oficial de la</h1>
            <br />
            <img className="imageLanding" src="https://res.cloudinary.com/maurodavid/image/upload/v1666718836/LMI/LOGO_LMI_yga1rh.png" alt="liga mendocina de improvisación" />
            <br />
            <div className="padding"><Link to="/lmi/home"><button className="btn">ENTRAR</button></Link></div>
        </div>
    )
}

export default Landing