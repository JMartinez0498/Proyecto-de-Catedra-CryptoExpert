import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Button,
  StyleSheet,
} from 'react-native';

import {colors} from '../../util/colors';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <ScrollView style={styles.base}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../images/logo-dark.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.text}>Correo electrónico: </Text>
      <TextInput
        style={styles.input}
        onChangeText={val => setEmail(val)}
        title="ALGO"
        value={email}
        autocomplete="email"
      />
      <Text style={styles.text}>Contraseña: </Text>
      <TextInput
        style={styles.input}
        onChangeText={val => setPass(val)}
        value={pass}
        secureTextEntry={true}
      />
      <TouchableHighlight onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Olvidé mi contraseña...</Text>
      </TouchableHighlight>
      <Button title="Acceder" color={colors.button} />
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  text: {
    color: colors.text,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  logo: {
    width: 180,
    height: 100,
  },
  input: {
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
    color: '#FFF',
    padding: 10,
    marginBottom: 20,
  },
  link: {
    marginBottom: 25,
    color: colors.link,
  },
});
