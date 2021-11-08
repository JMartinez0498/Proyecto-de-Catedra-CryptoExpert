import React, { useContext, useState } from 'react';
import {View, Text, Button, Image,TextInput,StyleSheet,TouchableOpacity} from 'react-native';
import {colors} from '../../util/colors';

const Statitics = ({navigation}) => {

  return (
    <View style={styles.base}>
      <Text style={styles.text}>Estadisticas</Text>
    </View>
  );
}

export default Statitics;

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
