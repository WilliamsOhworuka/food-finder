import React, {useEffect, useState} from 'react';
import {Appearance} from 'react-native';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UnauthenticatedScreens from './screens/UnauthenticatedScreens';
import AuthenticatedScreens from './screens/AuthenticatedScreens';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import {Provider} from './context/AuthContext';

const Stack = createStackNavigator();

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(
    Appearance.getColorScheme() === 'dark' ? true : false,
  );

  const [profileImage, setImage] = useState(
    'https://cdn.travelpulse.com/images/99999999-9999-9999-9999-999999999999/aa6644a7-d3b4-8673-5851-f6fb07743484/630x355.jpg',
  );

  const getProfileImage = async () => {
    const image = await AsyncStorage.getItem('profileImage');
    if (image) {
      setImage(image);
    }
  };

  const setProfileImage = (uri) => {
    setImage(uri);
    AsyncStorage.setItem('profileImage', uri);
  };

  const setColorScheme = ({colorScheme}) => {
    setIsDarkTheme(colorScheme === 'dark' ? true : false);
  };

  useEffect(() => {
    Appearance.addChangeListener(setColorScheme);

    return Appearance.removeChangeListener(setColorScheme);
  }, []);

  useEffect(() => {
    getProfileImage();
  }, []);

  const customDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      statusBar: '#80000000',
      text: '#333333',
    },
  };

  const customDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      statusBar: '#262626',
      text: '#ffffff',
    },
  };

  const toggleTheme = () => {
    setIsDarkTheme((isDarktheme) => !isDarktheme);
  };

  const theme = isDarkTheme ? customDarkTheme : customDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <Provider
        moreActions={{toggleTheme, setProfileImage}}
        moreState={{isDarkTheme, profileImage}}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="NoAuth" component={UnauthenticatedScreens} />
            <Stack.Screen name="Auth" component={AuthenticatedScreens} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}
