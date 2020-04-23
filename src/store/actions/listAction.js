import { SET_LIST, SET_LIST_LOADING } from "../actionTypes"
import axios from "axios"

export const setList = (payload) => {
    return {
        type: SET_LIST,
        payload: payload
    }
}

export const setListLoading = (payload) => {
    return {
        type: SET_LIST_LOADING,
        payload: payload
    }
}

export const fetchList = () => {
    return dispatch => {
        dispatch(setListLoading(true))
        axios.get(`https://covid19.mathdro.id/api/countries`)
            .then(({ data }) => {
                let countryArr = data.countries
                let newCountryArr = []
                countryArr.map(el => {
                    newCountryArr.push(el.name)
                })
                dispatch(setList(newCountryArr))
            })
            .catch(console.log)
            .finally(() => {
                dispatch(setListLoading(false))
            })
    }
}