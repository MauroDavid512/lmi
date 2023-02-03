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
export const ADMINON = 'ADMINON'
export const ADMINOFF = 'ADMINOFF'
export const DELETE_PLAYER = 'DELETE_PLAYER'
export const DELETE_TEAM = 'DELETE_TEAM'
export const DELETE_TOURNAMENT = 'DELETE_TOURNAMENT'
export const DELETE_GAME = 'DELETE_GAME'


export const selectHOME = () => {
    return function (dispatch) {
        dispatch({ type: HOME })
    }
}

export const selectPLAYERS = () => {
    return function (dispatch) {
        dispatch({ type: PLAYERS })
    }
}

export const selectTEAMS = () => {
    return function (dispatch) {
        dispatch({ type: TEAMS })
    }
}

export const selectTOURNAMENTS = () => {
    return function (dispatch) {
        dispatch({ type: TOURNAMENTS })
    }
}

export const selectGAMES = () => {
    return function (dispatch) {
        dispatch({ type: GAMES })
    }
}

export const selectTICKET = () => {
    return function (dispatch) {
        dispatch({ type: TICKET })
    }
}

export const selectCONTACT = () => {
    return function (dispatch) {
        dispatch({ type: CONTACT })
    }
}


// ------------------------------------  PLAYER ACTIONS --------------------------------------------  

export const getAllPlayers = () => {
    return async function (dispatch) {
        let allPlayers = await axios.get('http://localhost:3001/player')
        const respuesta = allPlayers.data
        dispatch({ type: GETALLPLAYERS, payload: respuesta })
    }
}

export const getPlayerDetail = (id) => {
    return async function (dispatch) {
        let player = await axios.get(`http://localhost:3001/player/${id}`)
        const respuesta = player.data
        dispatch({ type: PLAYERDETAIL, payload: respuesta })
    }
}

export const deletePlayer = (id) => {
    return async function (dispatch) {
        let info = axios.delete(`http://localhost:3001/player/delete/${id}`)
        dispatch({ type: DELETE_PLAYER, payload: info.data })
    }
}

// ------------------------------------  TEAM ACTIONS -------------------------------------------- 

export const getAllTeams = () => {
    return async function (dispatch) {
        let allTeams = await axios.get('http://localhost:3001/team')
        const respuesta = allTeams.data
        dispatch({ type: GETALLTEAMS, payload: respuesta })
    }
}

export const getTeamDetail = (id) => {
    return async function (dispatch) {
        let team = await axios.get(`http://localhost:3001/team/${id}`)
        const respuesta = team.data
        dispatch({ type: TEAMDETAIL, payload: respuesta })
    }
}

export const deleteTeam = (id) => {
    return async function (dispatch) {
        let info = axios.delete(`http://localhost:3001/team/delete/${id}`)
        dispatch({ type: DELETE_TEAM, payload: info.data })
    }
}

// ------------------------------------  TOURNAMENT ACTIONS -------------------------------------------- 

export const getAllTournaments = () => {
    return async function (dispatch) {
        let allTournaments = await axios.get('http://localhost:3001/tournament')
        const respuesta = allTournaments.data
        dispatch({ type: GETALLTOURNAMENTS, payload: respuesta })
    }
}

export const getTournamentDetail = (id) => {
    return async function (dispatch) {
        let tournament = await axios.get(`http://localhost:3001/tournament/${id}`)
        const respuesta = tournament.data
        dispatch({ type: TOURNAMENTDETAIL, payload: respuesta })
    }
}

export const deleteTournament= (id) => {
    return async function (dispatch) {
        let info = axios.delete(`http://localhost:3001/tournament/delete/${id}`)
        dispatch({ type: DELETE_TOURNAMENT, payload: info.data })
    }
}


// ----------------------------------- GAMES ACTIONS ----------------------------------------------------   

export const getAllGames = () => {
    return async function (dispatch) {
        let allTournaments = await axios.get('http://localhost:3001/game')
        const respuesta = allTournaments.data
        dispatch({ type: GETALLGAMES, payload: respuesta })
    }
}

export const deleteGame = (id) => {
    return async function (dispatch) {
        let info = axios.delete(`http://localhost:3001/team/game/${id}`)
        dispatch({ type: DELETE_GAME, payload: info.data })
    }
}


// ------------------------------  ADMIN ACTIONS ---------------------------------------------------


export const adminOn = () => {
    return async function (dispatch) {
        dispatch({ type: ADMINON })
    }
}

export const adminOff = () => {
    return async function (dispatch) {
        dispatch({ type: ADMINOFF })
    }
}