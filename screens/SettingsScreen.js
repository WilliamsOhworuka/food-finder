import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SettingsScreen = ({navigation}) => {
  return (
    <View style={styles.home}>
      <Text>Settings Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsScreen;
