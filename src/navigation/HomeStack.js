import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

import {colors} from '../util/colors';

const Stack = createStackNavigator();

const Logo = () => {
  return (
    <Image source={require('../images/logo-dark.png')} style={styles.logo} />
  );
};

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.text,
        headerStyle: {
          backgroundColor: colors.backgroundDark,
          shadowColor: 'black',
        },
        headerLeft: () => <Logo />,
      }}>
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 70,
    height: 40,
    marginLeft: 25,
  },
});
