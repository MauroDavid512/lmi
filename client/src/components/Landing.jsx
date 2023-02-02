import React from "react";
import "./Styles/styles.css"
import { Link } from "react-router-dom";


const Landing = () => {

    return (
        <div>
            <h1 class="letras">Bienvenid@ al sitio oficial de la</h1>
            <br />
            <img class="imageLanding" src="https://res.cloudinary.com/maurodavid/image/upload/v1675369638/LMI/LOGO_LMI_b2kcvj.png" alt="liga mendocina de improvisación" />
            <br />
            <div class="padding"><Link to="/lmi/home"><button className="btn">ENTRAR</button></Link></div>
        </div>
    )
}

export default Landing