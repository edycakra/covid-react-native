import {
    SET_LOCAL_CONFIRMED,
    SET_LOCAL_RECOVERED,
    SET_LOCAL_DEATH,
    SET_LOCAL_LOADING
} from '../actionTypes'

let initialState = {
    localConfirmed: 0,
    localRecovered: 0,
    localDeath: 0,
    localLoading: false
}

export const local = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCAL_CONFIRMED:
            return { ...state, localConfirmed: action.payload }
        case SET_LOCAL_RECOVERED:
            return { ...state, localRecovered: action.payload }
        case SET_LOCAL_DEATH:
            return { ...state, localDeath: action.payload }
        case SET_LOCAL_LOADING:
            return { ...state, localLoading: action.payload }
        default:
            return state
    }
}