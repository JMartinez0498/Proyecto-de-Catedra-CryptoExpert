import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {colors} from '../util/colors';

const Home = () => {
  return (
    <View style={styles.base}>
      <Text style={styles.text}>Home!</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    color: colors.text,
  },
});
