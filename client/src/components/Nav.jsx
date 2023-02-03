import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../redux/actions'
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom"
import LogAdmin from "./LogAdmin";


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
        <div class="navBack">
            <div class="navtop">
                <div class="searchBarContainer">
                <SearchBar/>
                </div>
                <div>
                <LogAdmin/>
                </div>
            </div>
            <div class="center">
            <Link class="nav" to="/lmi/home">
            
                
                <div class="navoption" onClick={methods.home}>Inicio</div>
                <div class="navoption" onClick={methods.players}>Jugadores</div>
                <div class="navoption" onClick={methods.teams}>Equipos</div>
                <div class="navoption" onClick={methods.tournaments}>Torneos</div>
                <div class="navoption" onClick={methods.games}>Juegos</div>
                <div class="navoption" onClick={methods.ticket}>¡Comprar entradas!</div>
                <div class="navoption" onClick={methods.contact}>Contrataciones</div>
                
            
            </Link>
            </div>
        </div>
    )
}

export default Nav