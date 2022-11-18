import {
    HOME,
    PLAYERS,
    TEAMS,
    TOURNAMENTS,
    GAMES,
    TICKET,
    CONTACT
} from '../actions'


const initialState = {
    current: 'home'
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
        default: return state
    }
}

export default rootReducer