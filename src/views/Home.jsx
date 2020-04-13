import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    StyleSheet,
    View,
    Image,
    Platform,
    StatusBar
} from 'react-native';
import axios from 'axios'
import { allActions } from '../store/actions';

import { Text, Block, Button, Icon } from 'galio-framework'

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

    //dateFormatting
    const dateFormat = (data) => {
        let input = new Date(data)
        let monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        let year = input.getFullYear();
        let month = ("0" + (input.getMonth() + 1)).slice(-2);
        let day = ("0" + input.getDate()).slice(-2);

        let hours = ("0" + input.getHours()).slice(-2);
        let minutes = ("0" + input.getMinutes()).slice(-2);

        return `${day} ${monthList[Number(month) - 1]} ${year} `
    }

    return (
        <View style={styles.container}>
            {
                (globalLoading || countryLoading) ?
                    <View>
                        <Image source={require('../../assets/covid.gif')} />
                    </View>
                    :
                    <View style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
                        <Text center h4 bold>COVID-19 : Overview</Text>
                        <Text center size={16} muted italic>Last Update: {dateFormat(date)}</Text>
                        <Block center fluid style={{ height: 250, justifyContent: 'center' }}>
                            <Button round color="#50C7C750" style={{ width: 300 }}><Text h5 bold><Icon name="earth" family="AntDesign" size={14} /> WORLDWIDE</Text></Button>
                            <Text bold size={20}><Icon name="users" family="Feather" size={12} /> Cases </Text>
                            <Text bold color={'rgb(60,179,113)'} h5>{confirmed}</Text>
                            <Text bold size={20}><Icon name="trending-up" family="Feather" size={12} /> Recovered</Text>
                            <Text bold color={'rgb(0,191,255)'} h5>{recovered}<Text muted size={16}>({((recovered / confirmed) * 100).toFixed(2)}%)</Text></Text>
                            <Text bold size={20}><Icon name="trending-down" family="Feather" size={12} /> Death </Text>
                            <Text bold color={'rgb(255,69,0)'} h5>{death}<Text muted size={16}>({((death / confirmed) * 100).toFixed(2)}%)</Text></Text>
                        </Block>
                        <Block center fluid style={{ height: 250, justifyContent: 'center' }}>
                            <Button round color="#50C7C750" style={{ width: 300 }}><Text p bold> INDONESIA</Text></Button>
                            <Text bold size={20}><Icon name="users" family="Feather" size={12} /> Cases </Text>
                            <Text bold color={'rgb(60,179,113)'} h5>{localConfirmed}</Text>
                            <Text bold size={20}><Icon name="trending-up" family="Feather" size={12} /> Recovered</Text>
                            <Text bold color={'rgb(0,191,255)'} h5>{localRecovered}<Text muted size={16}>({((localRecovered / localConfirmed) * 100).toFixed(2)}%)</Text></Text>
                            <Text bold size={20}><Icon name="trending-down" family="Feather" size={12} /> Death </Text>
                            <Text bold color={'rgb(255,69,0)'} h5>{localDeath}<Text muted size={16}>({((localDeath / localConfirmed) * 100).toFixed(2)}%)</Text></Text>
                        </Block>
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
        textAlign: 'center'
    },
});
