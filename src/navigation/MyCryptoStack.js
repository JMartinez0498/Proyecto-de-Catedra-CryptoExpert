import React, { useContext,useEffect, useState  } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyCryptoScreen from '../screens/MyCryptoScreen';
import Failed from '../screens/NewsScreen';
import {colors} from '../util/colors';
//Nueva impl
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase/firebase";
const Stack = createStackNavigator();

export default function MyCryptoStack() {
 
  const [user, loading, error] = useAuthState(auth);
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
          name="MyCryptos"
          component={Failed}
          options={{
            title: 'MyCryptos',
          }}
        />
      :
        <Stack.Screen
          name="MyCryptoStack"
          component={MyCryptoScreen}
          options={{
            title: 'MyCryptos',
          }}
        />
      }
    </Stack.Navigator>
  );
}
