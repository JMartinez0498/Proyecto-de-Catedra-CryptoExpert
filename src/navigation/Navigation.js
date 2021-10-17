import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TabStack from './TabStack';
import LoginStack from './userStacks/LoginStack';

import {colors} from '../util/colors';

const Stack = createStackNavigator();

export default function MyTabs() {
  return (
    <Stack.Navigator
      barStyle={{backgroundColor: colors.backgroundDark}}
      activeColor={colors.accent}>
      <Stack.Screen
        name="Home"
        component={TabStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Test"
        component={LoginStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
