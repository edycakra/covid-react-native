import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Picker,
    Dimensions,
    Image
} from 'react-native';
import axios from 'axios'
import { LineChart, PieChart } from 'react-native-chart-kit'

export default function Home() {
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

    //FIND DETAIL
    useEffect(() => {
        setLoading(true)
        axios.get(`https://covid19.mathdro.id/api/countries/${countryCode}`)
            .then(({ data }) => {
                setCases(data)
                setFound(true)
                setDate(data.lastUpdate)
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
            name: 'confirmed',
            population: cases.confirmed.value,
            color: 'rgba(0, 204, 0)',
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        })
        pieData.push({
            name: 'recovered',
            population: cases.recovered.value,
            color: 'rgba(25, 181, 254)',
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        })
        pieData.push({
            name: 'deaths',
            population: cases.deaths.value,
            color: 'rgba(255, 0, 0)',
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        })
        return pieData
    }

    return (
        <View style={styles.container}>
            {
                (countryLoading || loading) ?
                    <View>
                        <Image source={require('../../assets/covid.gif')} />
                    </View>
                    :
                    <View>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 50, width: 300 }}
                            onValueChange={(itemValue, itemIndex) => pickHandler(itemValue)}>
                            {countries.map((item, index) => {
                                return (<Picker.Item label={item} value={item} key={index} />)
                            })}
                        </Picker>
                        <Text>Last Update: {date.substring(0, 10)}</Text>
                        <View>
                            {
                                (!found) ?
                                    <View>
                                        <Text>0 Cases</Text>
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
