import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Picker,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import axios from 'axios'
import { PieChart } from 'react-native-chart-kit'
import * as Progress from 'react-native-progress'

import { Text, Button } from 'galio-framework'

export default function Chart() {
    //COUNTRIES
    const [countryLoading, setCountriesLoading] = useState(false)
    const [countries, setCountries] = useState([])
    //FIND DETAIL
    const [loading, setLoading] = useState(false)
    const [cases, setCases] = useState({})
    const [countryCode, setCountryCode] = useState('Indonesia') //default
    const [found, setFound] = useState(false)
    const [date, setDate] = useState('')

    //DROPDOWN
    const [selectedValue, setSelectedValue] = useState('Indonesia')

    //FIND DETAIL
    useEffect(() => {
        setLoading(true)
        axios.get(`https://covid19.mathdro.id/api/countries/${countryCode}`)
            .then(({ data }) => {
                setCases(data)
                setFound(true)
                setDate(data.lastUpdate)
                getPie()
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

    const getPie = () => {
        let pieData = []
        pieData.push({
            name: 'current',
            population: cases.confirmed.value - (cases.recovered.value + cases.deaths.value),
            color: 'rgb(60,179,113)',
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        })
        pieData.push({
            name: 'recovered',
            population: cases.recovered.value,
            color: 'rgb(0,191,255)',
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        })
        pieData.push({
            name: 'deaths',
            population: cases.deaths.value,
            color: 'rgb(255,69,0)',
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        })
        return pieData
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

        return `${day} ${monthList[Number(month) - 1]} ${year}`
    }


    //COUNTRIES
    useEffect(() => {
        setCountriesLoading(true)
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
    }, [])

    return (
        <View style={styles.container}>
            {
                (countryLoading || loading) ?
                    <View>
                        {/* <Text style={{ textAlign: "center" }}>loading, please wait...</Text> */}
                        {/* <Progress.Bar animated={true} indeterminate width={200} /> */}
                        <ActivityIndicator size="large" color="#000" style={{ height: '100%' }} />
                    </View>
                    :
                    <View>
                        <Text center h4 bold>COVID-19 : Pie Chart</Text>
                        <Text center size={16} muted italic>Last Update: {dateFormat(date)}</Text>
                        <Button center shadowless color="rgb(66, 82, 114, 1)" style={{ width: Dimensions.get("window").width - 50 }}>
                            <Picker
                                selectedValue={selectedValue}
                                textStyle={{fontSize: 20}}
                                style={{ height: 50, width: 300 }}
                                onValueChange={(itemValue, itemIndex) => pickHandler(itemValue)}>
                                {countries.map((item, index) => {
                                    return (<Picker.Item label={item} value={item} key={index} />)
                                })}
                            </Picker>
                        </Button>
                        <View>
                            {
                                (!found) ?
                                    <View>
                                        <Text center h4 bold>0 Cases</Text>
                                    </View>
                                    :
                                    <PieChart
                                        data={getPie()}
                                        width={Dimensions.get("window").width - 50}
                                        height={220}
                                        chartConfig={{
                                            backgroundColor: "#000000",
                                            backgroundGradientFrom: "#000000",
                                            backgroundGradientTo: "#ffa726",
                                            color: (opacity = 1) => "#ffffff",
                                            labelColor: (opacity = 1) => "#ffffff",
                                            style: {
                                                borderRadius: 10
                                            }
                                        }}
                                        accessor="population"
                                        backgroundColor="#000000"
                                        paddingLeft="15"
                                        absolute
                                    />
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
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
