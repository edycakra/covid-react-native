import React from 'react'
import { ActivityIndicator } from 'react-native'

export default function Loader() {
    return (
        <ActivityIndicator size="large" color="#000" style={{ height: '100%' }} />
    )
}