import React, { useContext,useEffect, useState  } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {colors} from '../util/colors';
import MyCryptoScreen from '../screens/MyCryptoScreen';
import MyCryptosTabStack from './myCryptosStacks/MyCryptosTabStack';
//Nueva impl
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase/firebase";
import { View, ActivityIndicator } from 'react-native';
const Stack = createStackNavigator();

class Loading extends React.Component {
  render() {
    return (
      <View style={{flex: 1,backgroundColor: colors.background, justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

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
      {loading ?
        <Stack.Screen
          name="LoadingScreen"
          component={Loading}
          options={{
            title: 'loading',
          }}
        />
      :
        user ?
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
