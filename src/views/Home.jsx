import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    StyleSheet,
    Text,
    View,
    Picker,
    Dimensions
} from 'react-native';
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay';
import { LineChart } from 'react-native-chart-kit'
import { allActions } from '../store/actions';

export default function Home() {
    const dispatch = useDispatch()
    //GLOBAL DATA
    /* REDUX
    const confirmed = useSelector(state => state.global.confirmed)
    const recovered = useSelector(state => state.global.recovered)
    const death = useSelector(state => state.global.death)
    const date = useSelector(state => state.global.date)
    const globalLoading = useSelector(state => state.global.globalLoading)
    */
    const [confirmed, setConfirmed] = useState(0)
    const [recovered, setRecovered] = useState(0)
    const [death, setDeath] = useState(0)
    const [date, setDate] = useState('')
    const [globalLoading, setGlobalLoading] = useState(true)
    //COUNTRIES
    const [countryLoading, setCountriesLoading] = useState(true)
    const [countries, setCountries] = useState([])

    //GLOBAL DATA
    useEffect(() => {
        axios.get(`https://covid19.mathdro.id/api`)
            .then(({ data }) => {
                setConfirmed(data.confirmed.value)
                setRecovered(data.recovered.value)
                setDeath(data.deaths.value)
                setDate(data.lastUpdate)
            })
            .catch(console.log)
            .finally(() => {
                setGlobalLoading(false)
            })
        // dispatch(allActions.fetchGlobal())
    }, [dispatch])

    //COUNTRIES
    useEffect(() => {
        axios.get(`https://covid19.mathdro.id/api/countries`)
            .then(({ data }) => {
                let countryArr = data.countries
                let newCountryArr = []
                countryArr.map(el => {
                    newCountryArr.push(el.name)
                })
                setCountries(newCountryArr)
            })
            .catch(console.log)
            .finally(() => {
                setCountriesLoading(false)
            })
    })

    return (
        <View style={styles.container}>
            {
                (globalLoading || countryLoading) ?
                    <View>
                        <Spinner
                            visible={true}
                            textContent={'processing, please wait...'}
                        />
                    </View>
                    :
                    <View>
                        <Text>COVID-19</Text>
                        <Text>Last Update: {date.substring(0, 10)}</Text>
                        <Text>============ GLOBAL ===============</Text>
                        <Text>GLOBAL</Text>
                        <Text>Confirmed {confirmed}</Text>
                        <Text>Recovered {recovered}</Text>
                        <Text>Death {death}</Text>
                        <Text>TEST</Text>
                    </View>
            }
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
