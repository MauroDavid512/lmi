import React from "react";


const Init = () => {

const [seemore, setSeemore] = React.useState(false)

const handleSeemore = (e,bool) =>{
    e.preventDefault()
    setSeemore(bool)
}
    return (
        <div >
            <div class="title">Sitio oficial de</div>
            <div class="titleInit">
                LA LIGA MENDOCINA <br /> DE IMPROVISACIÓN
            </div>
            <div class="center">
                <div class="playerContainer">
                    <div class="aboutBackground">
                        <div class="title">¿Quienes somos?</div><div class="flex">
                        <img class="imggame" src="https://res.cloudinary.com/maurodavid/image/upload/v1675369638/LMI/LOGO_LMI_b2kcvj.png" alt="" />
                        <div class="about"><b>
                        Cuenta la historia que allá por el año 2011, en un lugar repleto de misticismo (al que algunos llaman “un bar”) y rodeados de bebidas espirituosas, el actor y director teatral Esteban Agnello (quien pasará a la inmortalidad como “Pelado”) se encontraba reunido con un grupo de actores con quienes participaba de diversos talleres de actuación, dictados por él mismo. {!seemore?<div onClick={e=>handleSeemore(e,true)}class="vermas" >...ver más.</div>:false}
<br />
{seemore?<div> Experimentado en el tema de la Improvisación (con varios años en el grupo de El Taller y toda una década haciendo Humor de Miércoles), El Pelado y sus alumnos conversaban acerca de la continuidad de las clases y el desarrollo de los talleres de cara al futuro hasta que en un momento de iluminación – justo habían cambiado el foco que se encontraba arriba de la mesa en la que estaban- se planteó la idea que sería la piedra fundamental de la Liga Mendocina de Improvisación.
<br />
“¡Basta de hacer talleres! … ¿Y si armamos equipos y jugamos, actuamos entre nosotros?” fue el planteo.
<br />
Y así surgió la LMI, con la misión de desarrollar, producir y promover alternativas teatrales de alta calidad en Mendoza. Apenas 4 equipos fueron los que inauguraron la Liga y el 2011 consistió sólo un partido. Pero era el comienzo de algo grande.</div>:false}
{seemore?<div class="vermas" onClick={e=>handleSeemore(e,false)}>Ver menos</div>:false}
                        </b>
                        </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Init