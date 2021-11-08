/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';   
import {StatusBar} from 'react-native';
import Navigation from './src/navigation/Navigation';
import {colors} from './src/util/colors';

import SplashScreen from 'react-native-splash-screen';

const App = () => {
  // Oculta la SplashScreen
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      <StatusBar
        backgroundColor={colors.backgroundDark}
        barStyle="light-content"
      />
        <Navigation />
       
    </>
  );
};

export default App;
