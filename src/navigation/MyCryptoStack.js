import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyCryptoScreen from '../screens/MyCryptoScreen';

import {colors} from '../util/colors';
const Stack = createStackNavigator();

export default function MyCryptoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.text,
        headerStyle: {
          backgroundColor: colors.backgroundDark,
          shadowColor: 'black',
        },
      }}>
      <Stack.Screen
        name="MyCryptoStack"
        component={MyCryptoScreen}
        options={{
          title: 'MyCryptos',
        }}
      />
    </Stack.Navigator>
  );
}
