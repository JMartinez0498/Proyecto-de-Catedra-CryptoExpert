import React from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// Se pueden encontrar más iconos aquí: https://oblador.github.io/react-native-vector-icons/
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from '../navigation/HomeStack';
import MyCryptoStack from '../navigation/MyCryptoStack';
import SettingsStack from '../navigation/SettingsStack';
import NewsStack from './NewsStack';

import {colors} from '../util/colors';

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator barStyle={styles.base} activeColor={colors.accent}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="chart-timeline-variant"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyCryptos"
        component={MyCryptoStack}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bitcoin" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsStack}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="newspaper-variant-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#071E22',
  },
});
