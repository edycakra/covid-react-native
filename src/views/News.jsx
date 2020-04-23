import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Platform,
    StatusBar,
    Image,
    Linking
} from 'react-native';
import axios from 'axios'
import Loader from '../components/Loader'

import { Text, Block } from 'galio-framework'
import { ScrollView } from 'react-native-gesture-handler';

export default function News() {
    const [loading, setLoading] = useState(false)
    const [news, setNews] = useState([])
    const [date, setDate] = useState('')

    useEffect(() => {
        setLoading(true)
        axios.get(`http://newsapi.org/v2/top-headlines?country=us&q=corona&apiKey=9314195eaf9a4dd38cf90bd8512fcc99`)
            .then(({ data }) => {
                setNews(data.articles)
                setDate(dateFormat(data.articles[0].publishedAt))
            })
            .catch(console.log)
            .finally(() => {
                setLoading(false)
            })
    }, [])


    const dateFormat = (data) => {
        let input = new Date(data)
        let monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        let year = input.getFullYear();
        let month = ("0" + (input.getMonth() + 1)).slice(-2);
        let day = ("0" + input.getDate()).slice(-2);

        return `${day} ${monthList[Number(month) - 1]} ${year}`
    }

    const heightScreen = Dimensions.get("screen").height - 200
    const widthScreen = Dimensions.get("window").width

    return (
        <View style={styles.container}>
            {
                (loading || (news.length == 0)) ?
                    <View>
                        <Loader />
                    </View>
                    :
                    <View style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
                        <Text center h4 bold>COVID-19 : News</Text>
                        <Text center size={16} muted italic>Last Update: {dateFormat(date)}</Text>
                        <Block card fluid style={{ height: heightScreen }}>
                            <ScrollView>
                                {
                                    news.map((story, index) => {
                                        return (
                                            <View key={index}>
                                                <Image
                                                    style={{ width: widthScreen, height: 0.4 * heightScreen }}
                                                    source={{ uri: story.urlToImage }}
                                                ></Image>
                                                <Text>
                                                    ({story.source.name}) {story.title}
                                                </Text>
                                                <Text style={{ color: 'blue' }}
                                                    onPress={() => Linking.openURL(story.url)}>
                                                    > read more
                                                    </Text>
                                                <Text>
                                                </Text>
                                            </View>)
                                    })
                                }
                            </ScrollView>
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
    },
});
