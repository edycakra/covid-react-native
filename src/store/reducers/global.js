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
    globalLoading: true
}

export const global = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONFIRMED:
            return { ...state, confirmed: action.payload }
        case SET_RECOVERED:
            return { ...state, confirmed: action.payload }
        case SET_DEATH:
            return { ...state, confirmed: action.payload }
        case SET_DATE:
            return { ...state, confirmed: action.payload }
        case SET_GLOBAL_LOADING:
            return { ...state, confirmed: action.payload }
        default:
            return state
    }
}