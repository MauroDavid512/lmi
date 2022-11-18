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
            <div>

                <button onClick={methods.home}>Inicio</button>
                <button onClick={methods.players}>Jugadores</button>
                <button onClick={methods.teams}>Equipos</button>
                <button onClick={methods.tournaments}>Torneos</button>
                <button onClick={methods.games}>Juegos</button>
                <button onClick={methods.ticket}>¡Comprar entradas!</button>
                <button onClick={methods.contact}>Contrataciones</button>

            </div>
        </div>
    )
}

export default Nav