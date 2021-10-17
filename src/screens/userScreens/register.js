import React from 'react';
import {View, Text, Button, Image,TextInput,StyleSheet,TouchableOpacity} from 'react-native';


import {colors} from '../../util/colors';

const register = () => {
  return (
    <>
    <View style={styles.base}>
      <Text style={styles.text}>Nombre</Text>
      <TextInput style={styles.input} ></TextInput>
      <Text style={styles.text}>Correo</Text>
      <TextInput style={styles.input} ></TextInput>
      <Text style={styles.text}>Contraseña</Text>
      <TextInput style={styles.input} ></TextInput>
      <View style={styles.marginBottom}>
        <Button title="Registrarse" color={colors.button} style={styles.button} />
      </View>
      <View style={styles.opcion}>
        <Text style={styles.text}>o</Text>
        <Text style={styles.text}>Registrate con Google</Text>
      </View>
      <View style={styles.opcion}>
        <TouchableOpacity
        >
          <Image
              style={styles.tinyLogo}
              source={require('../../images/google.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
    
    </>
  );
};

export default register;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  text: {
    paddingTop:10,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.button,
  },
  input:{
    borderBottomColor:'#FFF',
    borderBottomWidth: 1,
    color:'#FFF',
    padding:10
  },
  opcion: {
    padding:20,
    alignItems:'center'
  },
  marginBottom:{
    marginTop:40
  },
  tinyLogo: {
    width: 70,
    height: 70,
  },
});
