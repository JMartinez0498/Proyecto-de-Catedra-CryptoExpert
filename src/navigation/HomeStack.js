import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import Search from '../components/Search';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {colors} from '../util/colors';

const Stack = createStackNavigator();

function Logo ({ navigation }) {
  return (
    
    <View style={styles.container}>
      <Image source={require('../images/logo-dark.png')} style={styles.logo} />
      <View style={styles.btnSearch}>
        <TouchableOpacity
          //onPress={() => navigation.navigate('searchStack')}
        >
        <FontAwesome
              name="search"
              color={colors.text}
              size={34}
            />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.text,
        headerStyle: {
          backgroundColor: colors.backgroundDark,
          shadowColor: 'black',
        },
        headerLeft: () => <Logo />,
      }}>
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="searchStack"
        component={Search}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 70,
    height: 40,
    marginLeft: 15,
  },

  container:{
    width: '100%',
    flexDirection: 'row',
  },
  
  btnSearch:{
    marginLeft:'70%',
  }
});
