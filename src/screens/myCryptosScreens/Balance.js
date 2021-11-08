import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import {colors} from '../../util/colors';
//import CustomButton from '../../components/CustomButton'
import CustomTable from '../../components/CustomTable'
import {auth,db} from '../../firebase/firebase'
import { useAuthState } from "react-firebase-hooks/auth";

const Balance = ({navigation}) => {
  //const [filtro,setFiltro] = useState('');
  const [totals, setTotals] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [user,loading,error]=useAuthState(auth);
  
  const getInformation= async()=>{
    try{      
      let array=[];
        const query=await db.collection("cryptos").where("id_user","==",user.uid).orderBy("invest","desc").get().then((querySnapshot)=>{
          querySnapshot.forEach((doc)=>{
            var obj=doc.data()
            array.push(obj);
            console.info("Valor en for ="+JSON.stringify(obj))
          });
          //console.info("Estoy Dentro de aguait",array[0].name);
          setCryptos(array);
        });
      
    }catch(err){
      console.error(err);
      ToastAndroid.show("Ocurrio un Error al Intentar Cargar Tu Información, Intenta de Nuevo", ToastAndroid.LONG);
    }
  }

  const [cryptos, setCryptos] = useState([]);

  const calculateTotals = () => {
    let valorActual = 0;
    let comprado = 0; 
    let vendido = 0;
    let lucro = 0; 
    let lucroP = 0;
    cryptos.map((item) => {
      valorActual += parseFloat(item.holdings);
      comprado += parseFloat(item.invest);
      vendido += parseFloat(item.profit);
      // lucro = valor actual - (comprado - vendido)
      // lucro = 43.57 - (100 - 100) = 43.57
      // lucro = 23.57 - (100 - 120) = 43.57
      lucro += (parseFloat(item.holdings) - (parseFloat(item.invest) - parseFloat(item.profit)))
    })
    valorActual = Math.floor(valorActual * 100) / 100
    lucro = Math.floor(lucro * 100) / 100
    let porcentaje = Math.floor(((lucro / comprado) * 100) * 100) / 100;
    if (porcentaje > 0) {
      lucroP = "(+"+ (porcentaje) +"%)"
    } else if (porcentaje < 0) {
      lucroP = "(-"+ (porcentaje*-1) +"%)"
    } else {
      lucroP = "("+ (porcentaje) +"%)"
    }

    setTotals({
      valorActual,
      comprado,
      vendido,
      lucro,
      lucroP
    })
    setIsLoading(false)
  }

  useEffect(() => {
    calculateTotals()
  }, [cryptos])

  useEffect(() => {
    getInformation()
  }, [])

  return (
    <View style={styles.base}>
      <Text style={[styles.text,styles.title]}>Saldo actual</Text>
      
      <Text style={[styles.text,styles.balance]}>{ isLoading ? <ActivityIndicator /> : ("$ " + totals.valorActual) }</Text>
      <View>
        <View style={styles.data}>
          <Text style={styles.text}>Total comprado:</Text>
          <Text style={styles.text}>{ isLoading ? <ActivityIndicator /> : ("$ " + totals.comprado) }</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.text}>Total vendido:</Text>
          <Text style={styles.text}>{ isLoading ? <ActivityIndicator /> : ("$ " + totals.vendido) }</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.text}>Total Ganado/Perdido: </Text>
          <Text style={ !isLoading && totals.lucro < 0 ? styles.textRed : styles.textGreen }>
            { isLoading ? <ActivityIndicator /> : ("$ " + totals.lucro + " " + totals.lucroP) }
          </Text>
        </View>
        <View style={styles.buttonPanel}>
          <View style={styles.filters}>
            {/* <CustomButton
              title="BTC/USD"
              onPress={() => console.log('Filtrar por compras CUSTOM')}
            /> */}
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      <CustomTable 
        cryptos={cryptos}
        setCryptos={setCryptos}
      />
    </View>
  );
}

export default Balance;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    color: colors.text,
  },
  textGreen: {
    color: colors.green,
  },
  textRed: {
    color: colors.red,
  },
  title: {
    fontSize: 12,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 5
  },
  balance: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonPanel: {
    marginTop: 10,
    flexDirection: 'row',
    fontSize: 10,
    justifyContent: 'space-between'
  },
  filters: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  divider: {
    height: 5,
    paddingBottom: 15,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
});
