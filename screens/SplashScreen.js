/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {Context} from '../context/AuthContext';

const SplashScreen = ({navigation}) => {
  const {checkSignin} = useContext(Context);

  useEffect(() => {
    const check = async () => {
      const signedIn = await checkSignin();
      if (signedIn) {
        navigation.replace('Auth');
      } else {
        navigation.replace('NoAuth');
      }
    };

    check();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
