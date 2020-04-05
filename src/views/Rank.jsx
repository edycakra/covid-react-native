import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios'

export default function Rank() {
    const [confirmed, setConfirmed] = useState(0)
    const [recovered, setRecovered] = useState(0)
    const [death, setDeath] = useState(0)
    const [date, setDate] = useState('')

    useEffect(() => {
        axios.get(`https://covid19.mathdro.id/api`)
            .then(({ data }) => {
                setConfirmed(data.confirmed.value)
                setRecovered(data.recovered.value)
                setDeath(data.deaths.value)
                setDate(data.lastUpdate)
            })
            .catch(console.log)
    })

    return (
        <View style={styles.container}>
            <Text>COVID-19</Text>
            <Text>RANK</Text>
            <Text>Confirmed {confirmed}</Text>
            <Text>Recovered {recovered}</Text>
            <Text>Death {death}</Text>
            <Text>Last Update: {date.substring(0, 10)}</Text>
        </View>
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
