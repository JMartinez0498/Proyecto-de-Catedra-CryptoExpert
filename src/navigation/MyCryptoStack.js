import React, { useContext } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyCryptoScreen from '../screens/MyCryptoScreen';
import Failed from '../screens/NewsScreen';
import {colors} from '../util/colors';
import { AuthContext } from '../authentication/AuthProvider';
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
        name="MyCryptoStack"
        component={MyCryptoScreen}
        options={{
          title: 'MyCryptos',
        }}
        />
      :
      <Stack.Screen
          name="Failed"
          component={Failed}
          options={{
            title: 'Failed',
          }}
        />
        }
    </Stack.Navigator>
  );
}
