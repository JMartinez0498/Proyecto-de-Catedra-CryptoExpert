import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {colors} from '../util/colors';

const NewsScreen = () => {
  return (
    <View style={styles.base}>
      <Text style={styles.text}>Próximamente!</Text>
    </View>
  );
};

export default NewsScreen;

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
