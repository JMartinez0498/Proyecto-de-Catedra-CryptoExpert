import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import {colors} from '../util/colors';

const SettingsScreen = () => {
  return (
    <View style={styles.base}>
      <Text style={styles.text}>Settings!</Text>
      <Button title="Test" color={colors.button} style={styles.button} />
    </View>
  );
};

export default SettingsScreen;

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
  button: {
    backgroundColor: colors.button,
  },
});