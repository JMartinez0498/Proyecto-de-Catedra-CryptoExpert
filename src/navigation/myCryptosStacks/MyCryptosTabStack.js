import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import BalanceScreen from '../../screens/myCryptosScreens/Balance';
import StatisticsScreen from '../../screens/myCryptosScreens/Statistics';

import {colors} from '../../util/colors';
const Tab = createMaterialTopTabNavigator();

export default function MyCryptosTabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textDisabled,
        tabBarIndicatorStyle: {backgroundColor: colors.accent},
        tabBarLabelColor: {color: colors.text},
        tabBarStyle: {
          backgroundColor: colors.backgroundDark,
        },
      }}>
      <Tab.Screen
        name="Balance"
        component={BalanceScreen}
        options={{
          titleBarLabel: 'Balance',
        }}
      />
      <Tab.Screen
        name="Estadisticas"
        component={StatisticsScreen}
        options={{
          titleBarLabel: 'Estadísticas',
        }}
      />
    </Tab.Navigator>
  );
}
