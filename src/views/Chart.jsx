import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import {
    StyleSheet,
    View,
    Picker,
    Dimensions
} from 'react-native';
import axios from 'axios'
import { PieChart } from 'react-native-chart-kit'
import Loader from '../components/Loader'

import { Text, Button } from 'galio-framework'

export default function Chart() {

    //LIST
    const list = useSelector(state => state.list.list)
    const listLoading = useSelector(state => state.list.listLoading)

    //FIND DETAIL
    const [countryCodeLoading, setCountryCodeLoading] = useState(false)
    const [cases, setCases] = useState({ confirmed: { value: 0 }, deaths: { value: 0 }, recovered: { value: 0 } })
    const [found, setFound] = useState(false)
    const [date, setDate] = useState('')

    //DROPDOWN
    const [selectedValue, setSelectedValue] = useState('Indonesia')

    //FIND DETAIL
    const getDetail = (input) => {
        setFound(false)
        setCountryCodeLoading(true)
        axios.get(`https://covid19.mathdro.id/api/countries/${input}`)
            .then(({ data }) => {
                setCases(data)
                setFound(true)
                setDate(data.lastUpdate)
            })
            .catch(console.log)
            .finally(() => {
                setCountryCodeLoading(false)
            })
    }
    useEffect(() => {
        getDetail(selectedValue)
    }, [selectedValue]);

    //pickHandling
    const pickHandler = (itemValue) => {
        setSelectedValue(itemValue)
        setCases({ confirmed: { value: 0 }, deaths: { value: 0 }, recovered: { value: 0 } })
        getDetail(itemValue)
    }

    const getPie = () => {
        let pieData = []
        let numOfPatients = cases.confirmed.value - (cases.recovered.value + cases.deaths.value)
        let calcCases = (100 * (numOfPatients / cases.confirmed.value)).toFixed(2)
        let calcRecoveries = (100 * (cases.recovered.value / cases.confirmed.value)).toFixed(2)
        let calcDeaths = (100 * (cases.deaths.value / cases.confirmed.value)).toFixed(2)

        if (cases.confirmed.value == 0) {
            numOfPatients = 0
            calcCases = 0
            calcRecoveries = 0
            calcDeaths = 0
        }

        pieData.push({
            name: `(${calcCases}%) patients`,
            population: numOfPatients,
            color: 'rgb(60,179,113)',
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        })
        pieData.push({
            name: `(${calcRecoveries}%) recoveries`,
            population: cases.recovered.value,
            color: 'rgb(0,191,255)',
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        })
        pieData.push({
            name: `(${calcDeaths}%) deaths`,
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

        return `${day} ${monthList[Number(month) - 1]} ${year}`
    }

    return (
        <View style={styles.container}>
            {
                (listLoading || countryCodeLoading || date.length == 0) ?
                    <View>
                        <Loader />
                    </View>
                    :
                    <View>
                        <Text center h4 bold>COVID-19 : Pie Chart</Text>
                        <Text center size={16} muted italic>Last Update: {dateFormat(date)}</Text>
                        <Button center shadowless color="rgb(66, 82, 114, 1)" style={{ width: Dimensions.get("window").width - 50 }}>
                            <Picker
                                selectedValue={selectedValue}
                                textStyle={{ fontSize: 20 }}
                                style={{ height: 50, width: 300 }}
                                onValueChange={(itemValue, itemIndex) => pickHandler(itemValue)}>
                                {list.map((item, index) => {
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
                                    <View>
                                        <PieChart
                                            data={getPie()}
                                            width={Dimensions.get("window").width - 50}
                                            height={220}
                                            chartConfig={{
                                                backgroundColor: "#FFFFFF",
                                                backgroundGradientFrom: "#000000",
                                                backgroundGradientTo: "#ffa726",
                                                color: (opacity = 1) => "#ffffff",
                                                labelColor: (opacity = 1) => "#ffffff",
                                                style: {
                                                    borderRadius: 10
                                                }
                                            }}
                                            accessor="population"
                                            backgroundColor="#FFFFFF"
                                            paddingLeft="15"
                                            absolute
                                        />
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
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
