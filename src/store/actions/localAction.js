import {
    SET_LOCAL_CONFIRMED,
    SET_LOCAL_RECOVERED,
    SET_LOCAL_DEATH,
    SET_LOCAL_LOADING
} from '../actionTypes'
import axios from 'axios'

export const setLocalConfirmed = (payload) => {
    return {
        type: SET_LOCAL_CONFIRMED,
        payload: payload
    }
}

export const setLocalRecovered = (payload) => {
    return {
        type: SET_LOCAL_RECOVERED,
        payload: payload
    }
}

export const setLocalDeath = (payload) => {
    return {
        type: SET_LOCAL_DEATH,
        payload: payload
    }
}

export const setLocalLoading = (payload) => {
    return {
        type: SET_LOCAL_LOADING,
        payload: payload
    }
}

export const fetchLocal = () => {
    return dispatch => {
        dispatch(setLocalLoading(true))
        axios.get(`https://covid19.mathdro.id/api/countries/indonesia`)
        .then(({ data }) => {
            dispatch(setLocalConfirmed(data.confirmed.value))
            dispatch(setLocalRecovered(data.recovered.value))
            dispatch(setLocalDeath(data.deaths.value))
        })
        .catch(console.log)
        .finally(() => {
            dispatch(setLocalLoading(false))
        })
    }
}