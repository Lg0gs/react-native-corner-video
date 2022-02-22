import React from 'react';
import Icon from 'react-native-ionicons'
import { Provider } from 'react-native-corner-video';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackScreen from './screens/Home';
import SettingsScreen from './screens/Settings';
import VideoScreen from './screens/Video';

const Tab = createBottomTabNavigator();

const options = (route: any, color: string, size: number) => {
  let iconName;

  if (route.name === 'HomeStack') {
    iconName = 'home';
  } else if (route.name === 'Settings') {
    iconName = 'ios-list';
  } else {
    iconName = 'play'
  }

  return <Icon name={iconName} size={size} color={color} />;
}

export default function App() {
  return (
      <Provider>
        <NavigationContainer>
          <Tab.Navigator screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#5C29CE',
            headerShown: false,
            tabBarIcon: ({ color, size }) => options(route, color, size)
          })}>
            <Tab.Screen name="HomeStack" component={HomeStackScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
            <Tab.Screen name="Videos" component={VideoScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
  );
}