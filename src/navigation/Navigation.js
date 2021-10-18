import React, { useEffect, useState,useContext } from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TabStack from './TabStack';
import LoginStack from './userStacks/LoginStack';
import RegisterStack from './userStacks/RegisterStack'
import {colors} from '../util/colors';
import auth from'@react-native-firebase/auth';
import { AuthContext } from '../authentication/AuthProvider';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createStackNavigator();

export default function MyTabs() {
  
  const {user,setUser} = useContext(AuthContext);
  const [initializing, setinitializing] = useState(true);

  const onAuthStateChanged = (user) =>{
    setUser(user);
    if(initializing){
      setinitializing(false);
    }
  }
  
  useEffect(() =>{
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if(initializing) {
    return null;
  }
  return (
    <NavigationContainer>
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
        <Stack.Screen
          name="Registro"
          component={RegisterStack}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
