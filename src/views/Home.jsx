import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Picker
} from 'react-native';
import axios from 'axios'

export default function Home() {
    //GLOBAL DATA
    const [globalLoading, setGlobalLoading] = useState(true)
    const [confirmed, setConfirmed] = useState(0)
    const [recovered, setRecovered] = useState(0)
    const [death, setDeath] = useState(0)
    const [date, setDate] = useState('')
    //COUNTRIES
    const [countryLoading, setCountryLoading] = useState(true)
    const [countries, setCountries] = useState([])
    //FIND DETAIL
    const [loading, setLoading] = useState(true)
    const [cases, setCases] = useState({})
    const [countryCode, setCountryCode] = useState('Indonesia')
    const [found, setFound] = useState(false)
    //DROPDOWN
    const [selectedValue, setSelectedValue] = useState('Indonesia')

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
    })

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
                setCountryLoading(false)
            })
    })

    //FIND DETAIL
    useEffect(() => {
        axios.get(`https://covid19.mathdro.id/api/countries/${countryCode}`)
            .then(({ data }) => {
                setCases(data)
                setFound(true)
            })
            .catch(console.log)
            .finally(() => {
                setLoading(false)
            })
    }, [countryCode]);

    //pickHandling
    const pickHandler = (itemValue) => {
        setLoading(true)
        setFound(false)
        setCountryCode(itemValue)
        setSelectedValue(itemValue)
    }

    return (
        <View style={styles.container}>
            {
                (globalLoading || countryLoading || loading) ?
                    <View>
                        <Text>Processing, please wait</Text>
                    </View>
                    :
                    <View>
                        <Text>COVID-19</Text>
                        <Text>Last Update: {date.substring(0, 10)}</Text>
                        <Text>====================================</Text>
                        <Text>GLOBAL</Text>
                        <Text>Confirmed {confirmed}</Text>
                        <Text>Recovered {recovered}</Text>
                        <Text>Death {death}</Text>
                        <Text>====================================</Text>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 50, width: 300 }}
                            onValueChange={(itemValue, itemIndex) => pickHandler(itemValue)}>
                            {countries.map((item, index) => {
                                return (<Picker.Item label={item} value={item} key={index} />)
                            })}
                        </Picker>
                        <View>
                            {
                                (!found) ?
                                    <View>
                                        <Text>Confirmed -</Text>
                                        <Text>Recovered -</Text>
                                        <Text>Death -</Text>
                                    </View>
                                    :
                                    <View>
                                        <Text>Confirmed {cases.confirmed.value}</Text>
                                        <Text>Recovered {cases.recovered.value}</Text>
                                        <Text>Death {cases.deaths.value}</Text>
                                    </View>
                            }
                        </View>
                    </View>
            }
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
