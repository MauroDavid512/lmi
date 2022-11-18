import axios from 'axios'


export const HOME = 'HOME'
export const PLAYERS = 'PLAYERS'
export const TEAMS = 'TEAMS'
export const TOURNAMENTS = 'TOURNAMENTS'
export const GAMES = 'GAMES'
export const TICKET = 'TICKET'
export const CONTACT = 'CONTACT'
export const GETALLPLAYERS = 'GETALLPLAYERS'
export const PLAYERDETAIL = 'PLAYERDETAIL'
export const GETALLTEAMS = 'GETALLTEAMS'
export const TEAMDETAIL = 'TEAMDETAIL'
export const GETALLTOURNAMENTS = 'GETALLTOURNAMENTS'
export const TOURNAMENTDETAIL = 'TOURNAMENTDETAIL'
export const GETALLGAMES = 'GETALLGAMES'
export const GAMEDETAIL = 'GAMEDETAIL'

export const selectHOME = () => {
    return function (dispatch){
        dispatch({type: HOME})
    }
}

export const selectPLAYERS = () => {
    return function (dispatch){
        dispatch({type: PLAYERS})
    }
}

export const selectTEAMS = () => {
    return function (dispatch){
        dispatch({type: TEAMS})
    }
}

export const selectTOURNAMENTS = () => {
    return function (dispatch){
        dispatch({type: TOURNAMENTS})
    }
}

export const selectGAMES = () => {
    return function (dispatch){
        dispatch({type: GAMES})
    }
}

export const selectTICKET = () => {
    return function (dispatch){
        dispatch({type: TICKET})
    }
}

export const selectCONTACT = () => {
    return function (dispatch){
        dispatch({type: CONTACT})
    }
}

export const getAllPlayers = () => {
    return async function (dispatch){
        let allPlayers = await axios.get('http://localhost:3001/player')
        const respuesta = allPlayers.data
        dispatch({ type: GETALLPLAYERS, payload: respuesta })
    }
}

export const getAllTeams = () => {
    return async function (dispatch){
        let allTeams = await axios.get('http://localhost:3001/team')
        const respuesta = allTeams.data
        dispatch({ type: GETALLTEAMS, payload: respuesta })
    }
}

export const getAllTournaments = () => {
    return async function (dispatch){
        let allTournaments = await axios.get('http://localhost:3001/tournament')
        const respuesta = allTournaments.data
        dispatch({ type: GETALLTOURNAMENTS, payload: respuesta })
    }
}
