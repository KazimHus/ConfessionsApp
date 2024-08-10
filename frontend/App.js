import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen'; 
import MainScreen from './screens/MainScreen';
import ConfessionScreen from "./screens/ConfessionScreen";
import {useFonts} from 'expo-font';

const Stack = createStackNavigator();

const App = () => {

  let [fontsLoaded] = useFonts ({
    'Honk': require ('./fonts/Honk.ttf')
  })

  if(!fontsLoaded)
  {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: true }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }}/>
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Confession" component={ConfessionScreen} options={{ headerShown: true}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
