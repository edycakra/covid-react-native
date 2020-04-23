import {
    SET_LIST_COUNTRIES,
    SET_COUNTRY_RANK,
    SET_RANK_LOADING
} from "../actionTypes"
import axios from "axios"

export const setListCountries = (payload) => {
    return {
        type: SET_LIST_COUNTRIES,
        payload: payload
    }
}

export const setCountryRank = (payload) => {
    return {
        type: SET_COUNTRY_RANK,
        payload: payload
    }
}

export const setRankLoading = (payload) => {
    return {
        type: SET_RANK_LOADING,
        payload: payload
    }
}

export const fetchRank = () => {
    return dispatch => {
        dispatch(setRankLoading(true))
        axios.get(`https://covid19.mathdro.id/api/countries`)
            .then(({ data }) => {
                let countryArr = data.countries
                dispatch(setListCountries(countryArr))
                if (listCountries.length > 0) {
                    let promises = []
                    let countries = []
                    for (let i in listCountries) {
                        countries[i] = []
                        countries[i].push(`${listCountries[i].name}`)
                        promises.push(
                            axios.get(`https://covid19.mathdro.id/api/countries/${listCountries[i].name}`)
                        )
                    }
                    return Promise.all(promises.map(p => p.catch(() => undefined)))
                        .then(response => {
                            for (let i in response) {
                                if (response[i]) {
                                    countries[i].push(response[i].data)
                                } else {
                                    countries[i].push({
                                        'confirmed': { value: 0 },
                                        'recovered': { value: 0 },
                                        'deaths': { value: 0 }
                                    })
                                }
                            }
                        })
                        .then(_ => {
                            dispatch(setCountryRank(countries))
                        })
                        .catch(console.log)
                }
            })
        if (countryRank.length > 0) {
            dispatch(setRankLoading(false))
        }
    }
}