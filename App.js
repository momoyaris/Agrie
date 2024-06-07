import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Chat from './Chat';
import Forum from './Forum';
import Profile from './Profile';
import NewsFeed from './Newsfeed';
import WeatherAlerts from './WeatherAlerts'; 

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Forum" component={Forum} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="NewsFeed" component={NewsFeed} />
        <Stack.Screen name="WeatherAlerts" component={WeatherAlerts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
