//estado geral da aplicação

import { AUTH_USER, PAGE_STATE, TOGGLE_NAV } from "../actionsTypes"

const inicialState = {
    page: 'Início',
    user: {
        auth: window.sessionStorage.name ? true : false,
        name: window.sessionStorage.name || ''
    },
    showNav: false
}

const store = (state = inicialState, action) => {
    switch (action.type){
        case PAGE_STATE:
            state.page = action.payload.text
            return {...state}
        case AUTH_USER:
            state.user = action.payload
            return {...state}
        case TOGGLE_NAV:
            state.showNav = !state.showNav
            return {...state}
        default:
            return {...state}
    }
}

export default store



//actions
export const pageTitle = text => {
    return ({
        type: PAGE_STATE,
        payload: {text}
    })
}

export const authUser = name => {
    window.sessionStorage.setItem('name', name)
    return ({
        type: AUTH_USER,
        payload: { name, auth: true}
    })
}

export const signOut = _ => {
    window.sessionStorage.removeItem('name')
    return ({
        type: AUTH_USER,
        payload: { name: '', auth: false}
    })
}
export const toggleNav = _ => {
    return ({
        type: TOGGLE_NAV,
    })
}