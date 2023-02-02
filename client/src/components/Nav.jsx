import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../redux/actions'
import { Link } from "react-router-dom"


const Nav = () => {
    const dispatch = useDispatch();

    const methods = {
        home() {dispatch(actions.selectHOME())},
        players() {dispatch(actions.selectPLAYERS())},
        teams() {dispatch(actions.selectTEAMS())},
        tournaments() {dispatch(actions.selectTOURNAMENTS())},
        games() {dispatch(actions.selectGAMES())},
        ticket() {dispatch(actions.selectTICKET())},
        contact() {dispatch(actions.selectCONTACT())}
    }


    return (
        <div>
            <div>
                Barra de busqueda
            </div>
            <div class="center">
            <div class="nav">
                <div class="navoption" onClick={methods.home}>Inicio</div>
                <div class="navoption" onClick={methods.players}>Jugadores</div>
                <div class="navoption" onClick={methods.teams}>Equipos</div>
                <div class="navoption" onClick={methods.tournaments}>Torneos</div>
                <div class="navoption" onClick={methods.games}>Juegos</div>
                <div class="navoption" onClick={methods.ticket}>¡Comprar entradas!</div>
                <div class="navoption" onClick={methods.contact}>Contrataciones</div>
            </div>
            </div>
        </div>
    )
}

export default Nav