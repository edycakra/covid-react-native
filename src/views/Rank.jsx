import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    StatusBar,
    ScrollView,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import {
    Table,
    Row,
    Rows
} from 'react-native-table-component';
import * as Progress from 'react-native-progress'

import axios from 'axios'

import { Text } from 'galio-framework'

export default function Rank() {
    const [confirmed, setConfirmed] = useState(0)
    const [recovered, setRecovered] = useState(0)
    const [death, setDeath] = useState(0)
    const [date, setDate] = useState('')

    const [listCountry, setListCountry] = useState([])
    const [countryRank, setCountryRank] = useState([])
    const [loading, setLoading] = useState(false)

    const widthScreen = Dimensions.get("window").width
    const widthSetting = [0.08 * widthScreen, 0.3 * widthScreen, 0.2 * widthScreen, 0.2 * widthScreen, 0.2 * widthScreen]

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
            // result[i].push(+i + 1)
            result[i].push('')
            result[i].push(sorted[i][0])
            result[i].push(sorted[i][1].confirmed.value)
            // result[i].push((sorted[i][1].recovered.value))
            // result[i].push(sorted[i][1].deaths.value)
            result[i].push(((sorted[i][1].recovered.value/sorted[i][1].confirmed.value)*100).toFixed(2))
            result[i].push(((sorted[i][1].deaths.value/sorted[i][1].confirmed.value)*100).toFixed(2))
        }
        return result
    }

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

    //GLOBAL
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

    return (
        <View style={styles.container}>
            {
                (loading) ?
                    <View>
                        {/* <Text style={{ textAlign: "center" }}>loading, please wait...</Text> */}
                        {/* <Progress.Bar animated={true} indeterminate width={200} /> */}
                        <ActivityIndicator size="large" color="#000" style={{ height: '100%' }} />
                    </View>
                    :
                    <View style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
                        <Text center h4 bold>COVID-19 : Cases</Text>
                        <Text center size={16} muted italic>Last Update: {dateFormat(date)}</Text>
                        <Table>
                            <Row data={['#', 'LOCATION', 'CASES', 'RECOVERED(%)', 'DEATHS(%)']} widthArr={widthSetting} style={{ height: 50, backgroundColor: '#000000' }} textStyle={{ color: '#ffffff', fontSize: 10 }} />
                            <Row data={['', 'Worldwide', confirmed, ((recovered/confirmed)*100).toFixed(2), ((death/confirmed)*100).toFixed(2)]} widthArr={widthSetting} style={{ height: 50, backgroundColor: '#4c90d4' }} textStyle={{ color: '#ffffff', fontSize: 12 }} />
                        </Table>
                        <ScrollView>
                            <Table>
                                {/* <Rows data={tableData()} widthArr={widthSetting} style={{ height: 50, backgroundColor: 'rgb(60,179,113)' }} textStyle={{ color: '#ffffff', fontSize: 12 }} /> */}
                                {
                                    tableData().map((rowData, index) => (
                                        <Row
                                            key={index}
                                            data={rowData}
                                            widthArr={widthSetting}
                                            style={[{ height: 50, backgroundColor: 'rgb(66, 82, 114)' }, index % 2 && { backgroundColor: 'rgb(99, 107, 134)' }]}
                                            textStyle={{ color: '#ffffff', fontSize: 10 }}
                                        />
                                    ))
                                }
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
