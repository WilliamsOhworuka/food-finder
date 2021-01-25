import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SupportScreen = ({navigation}) => {
  return (
    <View style={styles.home}>
      <Text>Support Screen</Text>
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

export default SupportScreen;
