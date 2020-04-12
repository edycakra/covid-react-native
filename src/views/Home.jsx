import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import axios from 'axios'
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
    const [localConfirmed, setlocalConfirmed] = useState(0)
    const [localRecovered, setlocalRecovered] = useState(0)
    const [localDeath, setlocalDeath] = useState(0)

    const [countryLoading, setCountriesLoading] = useState(true)
    const [countries, setCountries] = useState([])

    //GLOBAL DATA
    useEffect(() => {
        setGlobalLoading(true)
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
    }, [])

    //COUNTRIES
    useEffect(() => {
        setCountriesLoading(true)
        axios.get(`https://covid19.mathdro.id/api/countries/indonesia`)
            .then(({ data }) => {
                setlocalConfirmed(data.confirmed.value)
                setlocalRecovered(data.recovered.value)
                setlocalDeath(data.deaths.value)
            })
            .catch(console.log)
            .finally(() => {
                setCountriesLoading(false)
            })
    }, [])

    return (
        <View style={styles.container}>
            {
                (globalLoading || countryLoading) ?
                    <View>
                        <Image source={require('../../assets/covid.gif')} />
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
                        <Text>============ LOCAL ===============</Text>
                        <Text>INDONESIA</Text>
                        <Text>Confirmed {localConfirmed}</Text>
                        <Text>Recovered {localRecovered}</Text>
                        <Text>Death {localDeath}</Text>
                    </View>
            }
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
