import React, { useContext, useState } from 'react';
import {View, Text, Button, Image,TextInput,StyleSheet,TouchableOpacity} from 'react-native';
import {colors} from '../../util/colors';
import { AuthContext } from '../../authentication/AuthProvider';

const register = () => {
  const [email,setEmail] = useState();
  const [nombre,setNombre] = useState();
  const [password,setPassword] = useState();
  const [confirmPassword,setConfirmPassword] = useState();

  const {register} = useContext(AuthContext);

  return (
    <>
    <View style={styles.base}>
      <Text style={styles.text}>Nombre</Text>
      <TextInput style={styles.input} onChangeText={(nombre=> setNombre(nombre))} ></TextInput>

      <Text style={styles.text}>Correo</Text>
      <TextInput style={styles.input} onChangeText={(mail=>setEmail(mail))} ></TextInput>

      <Text style={styles.text}>Contraseña</Text>
      <TextInput style={styles.input} onChangeText={(pass=>setPassword(pass))} ></TextInput>

      <View style={styles.marginBottom}>
        <Button title="Registrarse" color={colors.button} style={styles.button} onPress={() =>register(email,password)} />
      </View>

      <View style={styles.opcion}>
        <Text style={styles.text}>o</Text>
        <Text style={styles.text}>Registrate con Google(Próximamente)</Text>
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
    width: 40,
    height: 40,
  },
});
