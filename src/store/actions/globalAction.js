import {
    SET_CONFIRMED,
    SET_RECOVERED,
    SET_DEATH,
    SET_DATE,
    SET_GLOBAL_LOADING
} from '../actionTypes'
import axios from 'axios'

export const setConfirmed = (payload) => {
    return {
        type: SET_CONFIRMED,
        payload: payload
    }
}

export const setRecovered = (payload) => {
    return {
        type: SET_RECOVERED,
        payload: payload
    }
}

export const setDeath = (payload) => {
    return {
        type: SET_DEATH,
        payload: payload
    }
}

export const setDate = (payload) => {
    return {
        type: SET_DATE,
        payload: payload
    }
}

export const setGlobalLoading = (payload) => {
    return {
        type: SET_GLOBAL_LOADING,
        payload: payload
    }
}

export const fetchGlobal = () => {
    return dispatch => {
        dispatch(setGlobalLoading(true))
        axios.get(`https://covid19.mathdro.id/api`)
        .then(({ data }) => {
            dispatch(setConfirmed(data.confirmed.value))
            dispatch(setRecovered(data.recovered.value))
            dispatch(setDeath(data.deaths.value))
            dispatch(setDate(data.lastUpdate))
        })
        .catch(console.log)
        .finally(() => {
            dispatch(setGlobalLoading(false))
        })
    }
}