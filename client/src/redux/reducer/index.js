import {
    HOME,
    PLAYERS,
    TEAMS,
    TOURNAMENTS,
    GAMES,
    TICKET,
    CONTACT,
    GETALLPLAYERS,
    GETALLTEAMS,
    GETALLTOURNAMENTS,
    PLAYERDETAIL,
    TEAMDETAIL,
    TOURNAMENTDETAIL
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
    gameDetail: {}

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




//------------------------------------------------------------------------------------------

        default: return state
    }
}

export default rootReducer