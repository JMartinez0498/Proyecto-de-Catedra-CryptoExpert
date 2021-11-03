import React, { useContext } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {colors} from '../util/colors';
import {AuthContext} from '../authentication/AuthProvider';

import MyCryptosTabStack from './myCryptosStacks/MyCryptosTabStack';
import MyCryptoScreen from '../screens/MyCryptoScreen';

const Stack = createStackNavigator();

export default function MyCryptoStack() {
  const {user} =useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.text,
        headerStyle: {
          backgroundColor: colors.backgroundDark,
          shadowColor: 'black',
        },
      }}>
      {user?
        <Stack.Screen
          name="Home"
          component={MyCryptosTabStack}
          options={{
            title: 'MyCryptos',
          }}
        />
      :
        <Stack.Screen
          name="Forbidden"
          component={MyCryptoScreen}
          options={{
            title: 'MyCryptos',
          }}
        />
      }
    </Stack.Navigator>
  );
}
