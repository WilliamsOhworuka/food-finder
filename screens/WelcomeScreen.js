/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SplashScreen = ({navigation}) => {
  const {colors} = useTheme();

  // console.log(colors.text);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF6347" barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          source={require('../assets/logo.png')}
          animation="bounceIn"
          duration={1500}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[styles.footer, {backgroundColor: colors.background}]}
        animation="fadeInUpBig">
        <Text style={[styles.title, {color: colors.text}]}>
          Find best food in your locality!
        </Text>
        <Text style={[styles.text, {color: colors.text}]}>
          Sign in with account
        </Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
            <LinearGradient
              colors={['#FFA07A', '#FF6347']}
              style={styles.signin}>
              <Text style={styles.textSignin}>Get Started</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const {height} = Dimensions.get('screen');
const logoHeight = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6347',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  logo: {
    height: logoHeight,
    width: logoHeight,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  textSignin: {
    color: '#fff',
  },
  button: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 30,
  },
  signin: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
});

export default SplashScreen;
