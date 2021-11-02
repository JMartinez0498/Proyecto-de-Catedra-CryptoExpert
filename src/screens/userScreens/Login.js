import React, {useState, useContext} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  Button,
  StyleSheet,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../authentication/AuthProvider';

import {colors} from '../../util/colors';

const LoginScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);

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
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Olvidé mi contraseña...</Text>
      </TouchableOpacity>
      <Button
        title="Acceder"
        color={colors.button}
        onPress={async () => {
          await login(email, pass);
          navigation.goBack();
        }}
      />

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={[styles.link, styles.centered]}>
          No tienes una cuenta?, crea una aquí
        </Text>
      </TouchableOpacity>
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
  centered: {
    textAlign: 'center',
    marginTop: 30,
  },
});
