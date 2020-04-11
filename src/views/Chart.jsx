import React, { useEffect, useState } from 'react';
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

export default function Home() {
    //COUNTRIES
    const [countryLoading, setCountriesLoading] = useState(true)
    const [countries, setCountries] = useState([])
    //FIND DETAIL
    const [loading, setLoading] = useState(true)
    const [cases, setCases] = useState({})
    const [countryCode, setCountryCode] = useState('Indonesia')
    const [found, setFound] = useState(false)
    //DROPDOWN
    const [selectedValue, setSelectedValue] = useState('Indonesia')
    //CHART
    const [dailyReport, setDailyReport] = useState([]);
    const [sortedDailyReport, setSortedDailyReport] = useState([]);

    const [beginDate, setBeginDate] = useState()
    const [endDate, setEndDate] = useState()
    const [rangePeriod, setRangePeriod] = useState([])

    const [chartLabel, setChartLabel] = useState([])
    const [chartConfirmed, setChartConfirmed] = useState([]);
    const [chartRecovered, setChartRecovered] = useState([]);
    const [chartDeaths, setChartDeaths] = useState([]);

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

    //CHART SECTION
    const compare = (a, b) => {
        if (a.chartLabelDate < b.chartLabelDate) {
            return -1;
        }
        if (a.chartLabelDate > b.chartLabelDate) {
            return 1;
        }
        return 0;
    }
    useEffect(() => {
        let sorted = dailyReport;
        setSortedDailyReport(sorted.sort(compare));

    }, [dailyReport])
    useEffect(() => {
        setChartLabel(sortedDailyReport.map(data => {
            let monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let date = new Date(data.chartLabelDate).getDate();
            let monthDisplay = monthList[new Date(data.chartLabelDate).getMonth()];

            return `${date}/${new Date(data.chartLabelDate).getMonth()}`
        }));
    }, [sortedDailyReport])

    useEffect(() => {
        setChartConfirmed(sortedDailyReport.map(data => data.confirmed));
        setChartRecovered(sortedDailyReport.map(data => data.recovered));
        setChartDeaths(sortedDailyReport.map(data => data.deaths));
    }, [sortedDailyReport])

    const dateInit = () => {
        let firstCase = new Date('2020-03-01')
        let today = new Date()

        setBeginDate(firstCase)
        setEndDate(today.setDate(today.getDate() - 1))
    }
    useEffect(() => {
        dateInit();
    }, [])

    const getPeriod = (begin, end) => {
        let arrDate = []
        let formattedDate = []
        let singleDate = new Date(begin)

        while (singleDate <= end) {
            arrDate.push(new Date(singleDate))
            singleDate.setDate(singleDate.getDate() + 1)
        }

        arrDate.map((data, index) => {
            formattedDate.push(`${data.getMonth() + 1}-${data.getDate()}-${data.getFullYear()}`)
        })
        setRangePeriod(formattedDate)
    }
    useEffect(() => {
        getPeriod(beginDate, endDate);
    }, [beginDate, endDate])

    useEffect(() => {
        rangePeriod.map((data, index) => {
            axios.get(`https://covid19.mathdro.id/api/daily/${data}`)
                .then(({ data }) => {
                    const filtered = data.filter((data2, index) => (data2.countryRegion === countryCode))
                    return filtered
                })
                .then(filtered => {
                    let chartLabelYear = data.split('-')[2];
                    let chartLabelMonth = data.split('-')[0];
                    let chartLabelDate = data.split('-')[1];

                    filtered[0]['chartLabelDate'] = new Date(`${chartLabelYear}-${chartLabelMonth}-${chartLabelDate}`);
                    setDailyReport(dailyReport => [...dailyReport, ...filtered])
                })
                .catch(console.log)
        })
    }, [rangePeriod, countryCode])
    const getChartData = () => {
        return {
            // labels: chartLabel,
            datasets: [
                {
                    data: chartConfirmed,
                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
                },
                {
                    data: chartRecovered,
                    color: (opacity = 1) => `rgba(0, 204, 0, ${opacity})`, // optional
                },
                {
                    data: chartDeaths,
                    color: (opacity = 1) => `rgba(255, 255, 51, ${opacity})`, // optional
                }
            ],
            legend: ["confirmed", "recovered", "death"]
        }
    }

    return (
        <View style={styles.container}>
            {
                (countryLoading || loading) ?
                    <View>
                        <Spinner
                            visible={true}
                            textContent={'processing, please wait...'}
                        />
                    </View>
                    :
                    <View>
                        <Text>============ DETAIL ==============</Text>
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
                        <Text>========= CHART SECTION ============</Text>
                        <View>
                            <Text>Since 2020-03-01</Text>
                            <LineChart
                                data={getChartData()}
                                width={Dimensions.get("window").width - 50} // from react-native
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
                                bezier
                                style={{
                                    marginVertical: 10,
                                    borderRadius: 5
                                }}
                                withInnerLines={false}
                                withDots={false}
                                withShadow={false}
                            />
                        </View>
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
