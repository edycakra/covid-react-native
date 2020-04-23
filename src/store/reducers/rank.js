import {
    SET_LIST_COUNTRIES,
    SET_COUNTRY_RANK,
    SET_RANK_LOADING
} from '../actionTypes'

let initialState = {
    listCountries: [],
    countryRank: [],
    rankLoading: false
}

export const rank = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST_COUNTRIES:
            return { ...state, listCountries: action.payload }
        case SET_COUNTRY_RANK:
            return { ...state, countryRank: action.payload }
        case SET_RANK_LOADING:
            return { ...state, rankLoading: action.payload }
        default:
            return state
    }
}