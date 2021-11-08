import React, { useState } from 'react';
import {View, Text, Button, Image,TextInput,StyleSheet,TouchableOpacity} from 'react-native';
import {colors} from '../../util/colors';

const MyAccount = () => {
  const [email,setEmail] = useState();
  const [nombre,setNombre] = useState();
  const [password,setPassword] = useState('123456');
  const [confirmPassword,setConfirmPassword] = useState();

  return (
    <>
    <View style={styles.base}>
      <Text style={styles.text}>Nombre</Text>
      <TextInput style={styles.input} onChangeText={(nombre=> setNombre(nombre))} ></TextInput>

      <Text style={styles.text}>Correo</Text>
      <TextInput style={styles.input} onChangeText={(mail=> setEmail(mail))}>  </TextInput>

      <Text style={styles.text}>Contraseña</Text>
      <TextInput
        style={styles.input}
        onChangeText={(pass=>setPassword(pass))}
      >
      </TextInput>

      <View style={styles.marginBottom}>
        <Button title="Aceptar" color={colors.button} style={styles.button} onPress={() => console.log('Actualizar info usuario')} />
      </View>
    </View>
    
    </>
  );
};

export default MyAccount;

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
    marginTop:100
  },
  tinyLogo: {
    width: 70,
    height: 70,
  },
});
