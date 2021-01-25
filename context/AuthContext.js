import AsyncStorage from '@react-native-async-storage/async-storage';
import createContext from './createDataContext';

const authReducer = (prev, action) => {
  switch (action.type) {
    case 'RETRIVE_TOKEN':
      return {
        ...prev,
        userToken: action.token,
        isLoading: false,
      };

    case 'LOGIN':
    case 'SIGNUP':
      return {
        ...prev,
        username: action.id,
        userToken: action.token,
        isLoading: false,
      };

    case 'LOGOUT':
      return {
        ...prev,
        username: null,
        userToken: null,
      };
  }
};

const initialState = {
  userToken: null,
  username: null,
  isLoading: false,
  isDarkTheme: false,
};

const actions = {
  signin: (dispatch) => async (foundUser) => {
    const userToken = foundUser.userToken;

    try {
      await AsyncStorage.setItem('userToken', userToken);
      dispatch({
        type: 'LOGIN',
        id: foundUser.username,
        token: userToken,
      });

      return userToken;
    } catch (error) {
      console.log(error);
    }
  },

  signout: (dispatch) => async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      dispatch({type: 'LOGOUT'});
      return true;
    } catch (error) {
      console.log(error);
    }
  },

  checkSignin: (dispatch) => async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      if (token) {
        dispatch({
          type: 'RETRIVE_TOKEN',
          token,
        });
      }

      return token;
    } catch (error) {
      console.log(error);
    }
  },
};

export const {Context, Provider} = createContext(
  authReducer,
  actions,
  initialState,
);
