import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import Search from '../components/Search';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CoinDetail from '../screens/CoinDetail';
import Statitics from '../screens/myCryptosScreens/Statistics';

import {colors} from '../util/colors';

const Stack = createStackNavigator();

function Logo(props) {
  return (
    
    <View style={styles.container}>
      <Image source={require('../images/logo-dark.png')} style={styles.logo} />
      <View style={styles.btnSearch}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Search')}
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

export default function HomeStack({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.text,
        headerStyle: {
          backgroundColor: colors.backgroundDark,
          shadowColor: 'black',
        },
        headerLeft: () => <Logo navigation={navigation} />,
      }}>
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{
          title: '',
        }}
      />








      <Stack.Screen
        name="CoinStack"
        component={CoinDetail}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="CoinStatitics"
        component={Statitics}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Search"
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
