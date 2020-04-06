import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function Untitled() {
    return (
        <View style={styles.container}>
            <View style={styles.rect}>
                <View style={styles.rect3Stack}>
                    <View style={styles.rect3}></View>
                    <View style={styles.rect4}>
                        <Text style={styles.globalConfirmed}>Global Confirmed</Text>
                    </View>
                </View>
                <View style={styles.rect5Row}>
                    <View style={styles.rect5}>
                        <Text style={styles.globalRecovered}>Global Recovered</Text>
                    </View>
                    <View style={styles.rect6}>
                        <Text style={styles.globalDeaths}>Global Deaths</Text>
                    </View>
                </View>
            </View>
            <View style={styles.rect1}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.dropdown}>Dropdown</Text>
                </TouchableOpacity>
                <View style={styles.rect7}>
                    <Text style={styles.countryConfirmed}>Country Confirmed</Text>
                </View>
                <View style={styles.rect8Row}>
                    <View style={styles.rect8}>
                        <Text style={styles.countryRecovered}>Country Recovered</Text>
                    </View>
                    <View style={styles.rect9}>
                        <Text style={styles.countryDeaths}>Country Deaths</Text>
                    </View>
                </View>
            </View>
            <View style={styles.rect2}>
                <View style={styles.rect10}>
                    <Text style={styles.dailyChart}>Daily Chart</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rect: {
        width: 400,
        height: 220,
        backgroundColor: "rgba(230, 230, 230,1)",
        marginTop: 63,
        alignSelf: "center"
    },
    rect3: {
        top: 0,
        left: 0,
        width: 375,
        height: 200,
        backgroundColor: "rgba(230, 230, 230,1)",
        position: "absolute"
    },
    rect4: {
        top: 0,
        left: 1,
        width: 375,
        height: 85,
        backgroundColor: "rgba(0,0,0,1)",
        position: "absolute"
    },
    globalConfirmed: {
        color: "rgba(255,255,255,1)",
        marginTop: 36,
        marginLeft: 97
    },
    rect3Stack: {
        width: 375,
        height: 85,
        marginTop: 11,
        marginLeft: 9
    },
    rect5: {
        width: 185,
        height: 85,
        backgroundColor: "rgba(0,0,0,1)"
    },
    globalRecovered: {
        color: "rgba(255,255,255,1)",
        marginTop: 35,
        marginLeft: 19
    },
    rect6: {
        width: 185,
        height: 85,
        backgroundColor: "rgba(0,0,0,1)",
        marginLeft: 1
    },
    globalDeaths: {
        color: "rgba(255,255,255,1)",
        marginTop: 35,
        marginLeft: 31
    },
    rect5Row: {
        height: 85,
        flexDirection: "row",
        marginTop: 11,
        marginLeft: 11,
        marginRight: 11
    },
    rect1: {
        width: 400,
        height: 220,
        backgroundColor: "rgba(230, 230, 230,1)",
        marginTop: 17,
        alignSelf: "center"
    },
    button: {
        width: 375,
        height: 34,
        backgroundColor: "rgba(16,1,1,1)",
        marginTop: 7,
        marginLeft: 10
    },
    dropdown: {
        color: "rgba(255,255,255,1)",
        marginTop: 10,
        marginLeft: 115
    },
    rect7: {
        width: 375,
        height: 74,
        backgroundColor: "rgba(0,0,0,1)",
        marginTop: 12,
        marginLeft: 11
    },
    countryConfirmed: {
        color: "rgba(255,255,255,1)",
        marginTop: 23,
        marginLeft: 80
    },
    rect8: {
        width: 185,
        height: 63,
        backgroundColor: "rgba(0,0,0,1)"
    },
    countryRecovered: {
        color: "rgba(255,255,255,1)",
        marginTop: 25,
        marginLeft: 21
    },
    rect9: {
        width: 185,
        height: 63,
        backgroundColor: "rgba(0,0,0,1)",
        marginLeft: 2
    },
    countryDeaths: {
        color: "rgba(255,255,255,1)",
        marginTop: 25,
        marginLeft: 24
    },
    rect8Row: {
        height: 63,
        flexDirection: "row",
        marginTop: 11,
        marginLeft: 11,
        marginRight: 10
    },
    rect2: {
        width: 400,
        height: 220,
        backgroundColor: "rgba(230, 230, 230,1)",
        marginTop: 17,
        alignSelf: "center"
    },
    rect10: {
        width: 375,
        height: 184,
        backgroundColor: "rgba(0,0,0,1)",
        marginTop: 13,
        marginLeft: 9
    },
    dailyChart: {
        color: "rgba(255,255,255,1)",
        marginTop: 85,
        marginLeft: 106
    }
});