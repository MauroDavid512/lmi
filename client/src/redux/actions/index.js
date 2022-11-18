import axios from 'axios'


export const HOME = 'HOME'
export const PLAYERS = 'PLAYERS'
export const TEAMS = 'TEAMS'
export const TOURNAMENTS = 'TOURNAMENTS'
export const GAMES = 'GAMES'
export const TICKET = 'TICKET'
export const CONTACT = 'CONTACT'

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
