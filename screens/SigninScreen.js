/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  StatusBar,
  TextInput,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '@react-navigation/native';
import {Context} from '../context/AuthContext';
import users from '../model/user';

const SigninScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [data, setData] = useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    showSecureIcon: false,
    isValidUser: true,
    isValidPassword: true,
  });
  const {signin} = useContext(Context);

  const handleInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    let newState;

    if (val.length > 0) {
      newState = {
        ...data,
        showSecureIcon: true,
      };
    } else {
      newState = {
        ...data,
        showSecureIcon: false,
      };
    }

    if (val.trim().length >= 8) {
      newState = {
        ...newState,
        password: val,
        isValidPassword: true,
      };
    } else {
      newState = {
        ...newState,
        password: val,
        isValidPassword: false,
      };
    }

    setData(newState);
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleSignIn = async () => {
    const foundUser = users.find(
      (user) =>
        user.username === data.username && user.password === data.password,
    );

    if (data.username.length === 0 || data.password.length === 0) {
      Alert.alert(
        'Invalid input',
        'Username or Password field cannot be empty',
        [{text: 'Okay'}],
      );

      return;
    }

    if (!foundUser) {
      Alert.alert('Invalid User', 'Username or Password is incorrect', [
        {text: 'Okay'},
      ]);

      return;
    }

    const token = await signin(foundUser);

    if (token) {
      navigation.replace('Auth');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF6347" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View
        style={[styles.footer, {backgroundColor: colors.background}]}
        animation="fadeInUpBig">
        <Text style={[styles.text_footer, {color: colors.text}]}>Username</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Username"
            placeholderTextColor="#666666"
            style={[styles.text_input, {color: colors.text}]}
            autoCapitalize="none"
            onChangeText={(val) => handleInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Text style={styles.errorMsg}>
            Username must be 4 characters long.
          </Text>
        )}
        <Text style={[styles.text_footer, {color: colors.text, marginTop: 35}]}>
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry}
            style={[styles.text_input, {color: colors.text}]}
            onChangeText={(val) => handlePasswordChange(val)}
            autoCapitalize="none"
          />
          {data.showSecureIcon ? (
            <Animatable.View animation="bounceIn">
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidPassword ? null : (
          <Text style={styles.errorMsg}>
            Password must be 8 characters long.
          </Text>
        )}
        <TouchableOpacity>
          <Text style={{color: '#FF6347', marginTop: 15}}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={handleSignIn}>
            <LinearGradient
              colors={['#FFA07A', '#FF6347']}
              style={styles.signIn}>
              <Text style={[styles.textSign, {color: '#fff'}]}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={[
              styles.signIn,
              {
                borderColor: '#FF6347',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text style={[styles.textSign, {color: '#FF6347'}]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6347',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 35,
  },
  text_footer: {
    fontSize: 20,
    color: '#05375a',
  },
  text_input: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    marginBottom: Platform.OS === 'ios' ? 0 : -10,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  button: {
    marginTop: 50,
    alignItems: 'center',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
});

export default SigninScreen;
