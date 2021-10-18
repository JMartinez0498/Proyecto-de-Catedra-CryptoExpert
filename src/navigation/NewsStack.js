import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NewsScreen from '../screens/NewsScreen';
import {colors} from '../util/colors';
const Stack = createStackNavigator();

export default function NewsStack() {
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
        name="NewsStack"
        component={NewsScreen}
        options={{
          title: 'Nel',
        }}
      />
    </Stack.Navigator>
  );
}
