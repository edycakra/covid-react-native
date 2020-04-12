import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    StatusBar,
    ScrollView,
    Image
} from 'react-native';
import {
    Table,
    Row,
    Rows
} from 'react-native-table-component';
import axios from 'axios'

export default function Rank() {
    const [confirmed, setConfirmed] = useState(0)
    const [recovered, setRecovered] = useState(0)
    const [death, setDeath] = useState(0)
    const [date, setDate] = useState('')

    const [listCountry, setListCountry] = useState([])
    const [countryRank, setCountryRank] = useState([])
    const [loading, setLoading] = useState(false)
    const [rankLoading, setRankLoading] = useState(false)

    useEffect(() => {
        axios.get(`https://covid19.mathdro.id/api`)
            .then(({ data }) => {
                setConfirmed(data.confirmed.value)
                setRecovered(data.recovered.value)
                setDeath(data.deaths.value)
                setDate(data.lastUpdate)
            })
            .catch(console.log)
    }, [])

    //COUNTRIES
    useEffect(() => {
        setLoading(true)
        axios.get(`https://covid19.mathdro.id/api/countries`)
            .then(({ data }) => {
                let countryArr = data.countries
                setListCountry(countryArr)
                if (listCountry.length > 0) {
                    let promises = []
                    let countries = []
                    for (let i in listCountry) {
                        countries[i] = []
                        countries[i].push(`${listCountry[i].name}`)
                        promises.push(
                            axios.get(`https://covid19.mathdro.id/api/countries/${listCountry[i].name}`)
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
                            setCountryRank(countries)
                        })
                        .catch(console.log)
                }
            })
        if (countryRank.length > 0) {
            setLoading(false)
        }
    })

    const sortData = (input) => {
        input.sort(function (a, b) {
            return a[1].confirmed.value - b[1].confirmed.value;
        });

        return input.reverse()
    }

    const tableData = () => {
        let sorted = sortData(countryRank)
        let result = []
        for (let i in sorted) {
            result[i] = []
            result[i].push(+i + 1)
            result[i].push(sorted[i][0])
            result[i].push(sorted[i][1].confirmed.value)
            result[i].push(sorted[i][1].recovered.value)
            result[i].push(sorted[i][1].deaths.value)
        }
        return result
    }


    return (
        <View style={styles.container}>
            {
                (loading) ?
                    <View>
                        <Image source={require('../../assets/covid.gif')} />
                    </View>
                    :
                    <View style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
                        <Text>COVID-19</Text>
                        <Text>Last Update: {date.substring(0, 10)}</Text>
                        <Text>=======================================</Text>
                        <Table>
                            <Row data={['', 'Global', confirmed, recovered, death]} />
                        </Table>
                        <ScrollView>
                            <Table>
                                <Rows data={tableData()} />
                            </Table>
                        </ScrollView>

                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
