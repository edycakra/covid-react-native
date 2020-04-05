import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './src/views/Home'
import Rank from './src/views/Rank'

console.disableYellowBox = true;

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
      {/* <Stack.Navigator initialRouteName='Home'> */}
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Rank' component={Rank} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

