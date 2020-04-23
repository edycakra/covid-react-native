import {
    SET_CONFIRMED,
    SET_RECOVERED,
    SET_DEATH,
    SET_DATE,
    SET_GLOBAL_LOADING
} from '../actionTypes'

let initialState = {
    confirmed: 0,
    recovered: 0,
    death: 0,
    date: '',
    globalLoading: false
}

export const global = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONFIRMED:
            return { ...state, confirmed: action.payload }
        case SET_RECOVERED:
            return { ...state, recovered: action.payload }
        case SET_DEATH:
            return { ...state, death: action.payload }
        case SET_DATE:
            return { ...state, date: action.payload }
        case SET_GLOBAL_LOADING:
            return { ...state, globalLoading: action.payload }
        default:
            return state
    }
}