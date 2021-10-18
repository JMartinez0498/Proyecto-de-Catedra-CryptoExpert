import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../authentication/AuthProvider';

import {colors} from '../util/colors';

const SettingsScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);

  return (
    <View style={styles.base}>
      <View style={styles.options}>
        {user ? (
          <View style={styles.message}>
            <Text style={[styles.text]}>Hola de nuevo, {user.email}</Text>
          </View>
        ) : (
          <View />
        )}
        <TouchableOpacity
          onPress={() => {
            if (user) {
              console.log();
            } else {
              navigation.navigate('Login');
            }
          }}>
          <View style={styles.option}>
            <Text style={styles.optionText}>Mi Cuenta</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />
        {user ? (
          <TouchableOpacity onPress={() => logout()}>
            <View style={styles.option}>
              <Text style={styles.optionText}>Cerrar Sesión</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
      <View style={styles.footer}>
        <Text style={[styles.text, styles.footerText]}>UDB</Text>
        <Text style={[styles.text, styles.footerText]}>DPS CICLO02 2021</Text>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 20,
  },
  text: {
    color: colors.text,
  },
  message: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  options: {
    flex: 1,
  },
  option: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  optionText: {
    color: colors.text,
    fontSize: 18,
  },
  button: {
    backgroundColor: colors.button,
  },
  divider: {
    height: 15,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  footerText: {
    fontSize: 18,
  },
});
