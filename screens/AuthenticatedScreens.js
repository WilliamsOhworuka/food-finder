import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainTabScreen from './MainTabScreen';
import {DrawerContent} from './DrawerContent';
import SupportScreen from './SupportScreen';
import SettingsScreen from './SettingsScreen';
import BookmarkScreen from './BookmarkScreen';

const Drawer = createDrawerNavigator();

const AuthenticatedScreens = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="back"
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
      <Drawer.Screen name="SupportScreen" component={SupportScreen} />
      <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
      <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
    </Drawer.Navigator>
  );
};

export default AuthenticatedScreens;
