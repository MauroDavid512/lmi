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
        case GETALLPLAYERS:
            return {
                ...state,
                players: action.payload
            }
        default: return state
    }
}

export default rootReducer