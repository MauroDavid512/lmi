import React from "react";
import "./Styles/styles.css"
import { Link } from "react-router-dom";


const Landing = () => {


    return (
        <div>
            <h1>Bienvenid@ al sitio oficial de la</h1>
            <br />
            <img className="imageLanding" src="https://res.cloudinary.com/maurodavid/image/upload/v1666718836/LMI/LOGO_LMI_yga1rh.png" alt="liga mendocina de improvisación" />
            <br />
            <Link to="/lmi/home"><button className="btn">ENTRAR</button></Link>
        </div>
    )
}

export default Landing