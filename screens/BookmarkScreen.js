import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const BookmarkScreen = ({navigation}) => {
  return (
    <View style={styles.home}>
      <Text>Bookmark Screen</Text>
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

export default BookmarkScreen;
