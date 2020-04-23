import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    StyleSheet,
    View,
    Image,
    Platform,
    StatusBar
} from 'react-native';
import { allActions } from '../store/actions';
import Overview from '../components/Overview'

export default function Home() {
    const dispatch = useDispatch()

    //GLOBAL DATA
    const confirmed = useSelector(state => state.global.confirmed)
    const recovered = useSelector(state => state.global.recovered)
    const death = useSelector(state => state.global.death)
    const date = useSelector(state => state.global.date)
    const globalLoading = useSelector(state => state.global.globalLoading)

    //LOCAL
    const localConfirmed = useSelector(state => state.local.localConfirmed)
    const localRecovered = useSelector(state => state.local.localRecovered)
    const localDeath = useSelector(state => state.local.localDeath)
    const localLoading = useSelector(state => state.local.localLoading)

    //LIST
    // const list = useSelector(state => state.list.list)
    const listLoading = useSelector(state => state.list.listLoading)

    //GLOBAL DATA
    useEffect(() => {
        dispatch(allActions.fetchGlobal())
    }, [dispatch])

    //LOCAL
    useEffect(() => {
        dispatch(allActions.fetchLocal())
    }, [dispatch])

    //ALL COUNTRIES
    useEffect(() => {
        dispatch(allActions.fetchList())
    }, [dispatch])

    return (
        <View style={styles.container}>
            {
                (globalLoading || localLoading || listLoading) ?
                    <View>
                        <Image source={require('../../assets/covid.gif')} />
                    </View>
                    :
                    <View style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
                        <Overview
                            date={date}
                            confirmed={confirmed}
                            recovered={recovered}
                            death={death}
                            localConfirmed={localConfirmed}
                            localRecovered={localRecovered}
                            localDeath={localDeath}
                        />
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
        textAlign: 'center'
    },
});
