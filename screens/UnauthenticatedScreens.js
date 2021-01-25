import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './WelcomeScreen';
import SigninScreen from './SigninScreen';
import SignupScreen from './SignupScreen';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="Welcome" component={SplashScreen} />
      <RootStack.Screen name="Signin" component={SigninScreen} />
      <RootStack.Screen name="Signup" component={SignupScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
