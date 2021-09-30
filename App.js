/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar, StyleSheet, useColorScheme, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';

const App = () => {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
