import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { Provider } from 'react-redux'
import store from './src/store/index'

import Home from './src/views/Home'
import Chart from './src/views/Chart'
import Rank from './src/views/Rank'
import News from './src/views/News'

console.disableYellowBox = true;

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const Homescreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Overview') {
            iconName = focused ? 'ios-globe' : 'ios-globe';
          } else if (route.name === 'List') {
            iconName = focused ? 'md-list' : 'md-list';
          } else if (route.name === 'Chart') {
            iconName = focused ? 'ios-podium': 'ios-podium'
          } else if (route.name === 'News') {
            iconName = focused ? 'md-book': 'md-book'
          }

          return <Ionicons
            name={iconName}
            size={size}
            color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#2E71DC',
        inactiveTintColor: 'grey',
        showIcon: true,
        showLabel: true
      }}
      initialRouteName='Overview'
    >
      <Tab.Screen name="Overview" component={Home} />
      <Tab.Screen name="List" component={Rank} />
      <Tab.Screen name="Chart" component={Chart} />
      <Tab.Screen name="News" component={News} />

    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Homescreen' screenOptions={{ headerShown: false }}>
          <Stack.Screen name='HomeScreen' component={Homescreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

