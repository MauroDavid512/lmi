import {
    HOME,
    PLAYERS,
    TEAMS,
    TOURNAMENTS,
    GAMES,
    GETALLGAMES,
    TICKET,
    CONTACT,
    GETALLPLAYERS,
    GETALLTEAMS,
    GETALLTOURNAMENTS,
    PLAYERDETAIL,
    TEAMDETAIL,
    TOURNAMENTDETAIL,
    ADMINON,
    ADMINOFF,
    DELETE_PLAYER,
    DELETE_TEAM,
    DELETE_TOURNAMENT,
    DELETE_GAME
} from '../actions'


const initialState = {
    current: 'home',
    tournaments: [],
    players: [],
    teams: [],
    games: [],
    tournamentDetail: {},
    playerDetail: {},
    teamDetail: {},
    gameDetail: {},
    admin: false

}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        // Renderizado seleccionando opciones en Nav -------------------------------------

        case HOME:
            return {
                ...state,
                current: 'home'
            }
        case PLAYERS:
            return {
                ...state,
                current: 'players'
            }
        case TEAMS:
            return {
                ...state,
                current: 'teams'
            }
        case TOURNAMENTS:
            return {
                ...state,
                current: 'tournaments'
            }
        case GAMES:
            return {
                ...state,
                current: 'games'
            }
        case TICKET:
            return {
                ...state,
                current: 'ticket'
            }
        case CONTACT:
            return {
                ...state,
                current: 'contact'
            }

        // Funcionalidades de PLAYER -----------------------------------------------------

        case GETALLPLAYERS:
            return {
                ...state,
                players: action.payload
            }
        case PLAYERDETAIL:
            return {
                ...state,
                playerDetail: action.payload
            }
        case DELETE_PLAYER:
            return {
                ...state,
                players: action.payload
            }

        // Funcionalidades de TEAM --------------------------------------------------------

        case GETALLTEAMS:
            return {
                ...state,
                teams: action.payload
            }
        case TEAMDETAIL:
            return {
                ...state,
                teamDetail: action.payload
            }

        //Funcionalidades de TOURNAMENT ------------------------------------------------

        case GETALLTOURNAMENTS:
            return {
                ...state,
                tournaments: action.payload
            }
        case TOURNAMENTDETAIL:
            return {
                ...state,
                tournamentDetail: action.payload
            }

        //Funcionalidades de GAMES ------------------------------------------------------
        case GETALLGAMES:
            return {
                ...state,
                games: action.payload
            }
        // Funcionalidades de ADMIN ------------------------------------------------------
        case ADMINON:
            return {
                ...state,
                admin: true
            }
        case ADMINOFF:
            return {
                ...state,
                admin: false
            }




        //------------------------------------------------------------------------------------------

        default: return state
    }
}

export default rootReducer