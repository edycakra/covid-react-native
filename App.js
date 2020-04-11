import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Provider } from 'react-redux'
import store from './src/store/index'

import Home from './src/views/Home'
import Chart from './src/views/Chart'
import Rank from './src/views/Rank'
import Untitled from './src/views/Untitled'


console.disableYellowBox = true;

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Rank' screenOptions={{ headerShown: false }}>
          {/* <Stack.Navigator initialRouteName='Home'> */}
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Chart' component={Chart} />
          <Stack.Screen name='Rank' component={Rank} />
          <Stack.Screen name='Untitled' component={Untitled} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

