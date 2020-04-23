import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import {
    Text,
    Block,
    Button,
    Icon
} from 'galio-framework'

export default function Overview(props) {
    const {
        date,
        confirmed,
        recovered,
        death,
        localConfirmed,
        localRecovered,
        localDeath
    } = props

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
        <View>
            <Text center h4 bold>COVID-19 : Overview</Text>
            <Text center size={16} muted italic>Last Update: {dateFormat(date)}</Text>
            <Block center fluid style={{ height: 250, justifyContent: 'center' }}>
                <Button round color="#50C7C750" style={{ width: 300 }}><Text h5 bold><Icon name="earth" family="AntDesign" size={14} /> WORLDWIDE</Text></Button>
                <Text bold size={20}><Icon name="users" family="Feather" size={12} /> Cases </Text>
                <Text bold color={'rgb(60,179,113)'} h5>{confirmed}</Text>
                <Text bold size={20}><Icon name="trending-up" family="Feather" size={12} /> Recoveries</Text>
                <Text bold color={'rgb(0,191,255)'} h5>{recovered}<Text muted size={16}>({((recovered / confirmed) * 100).toFixed(2)}%)</Text></Text>
                <Text bold size={20}><Icon name="trending-down" family="Feather" size={12} /> Deaths </Text>
                <Text bold color={'rgb(255,69,0)'} h5>{death}<Text muted size={16}>({((death / confirmed) * 100).toFixed(2)}%)</Text></Text>
            </Block>
            <Block center fluid style={{ height: 250, justifyContent: 'center' }}>
                <Button round color="#50C7C750" style={{ width: 300 }}><Text p bold> INDONESIA</Text></Button>
                <Text bold size={20}><Icon name="users" family="Feather" size={12} /> Cases </Text>
                <Text bold color={'rgb(60,179,113)'} h5>{localConfirmed}</Text>
                <Text bold size={20}><Icon name="trending-up" family="Feather" size={12} /> Recoveries</Text>
                <Text bold color={'rgb(0,191,255)'} h5>{localRecovered}<Text muted size={16}>({((localRecovered / localConfirmed) * 100).toFixed(2)}%)</Text></Text>
                <Text bold size={20}><Icon name="trending-down" family="Feather" size={12} /> Deaths </Text>
                <Text bold color={'rgb(255,69,0)'} h5>{localDeath}<Text muted size={16}>({((localDeath / localConfirmed) * 100).toFixed(2)}%)</Text></Text>
            </Block>
        </View>
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
