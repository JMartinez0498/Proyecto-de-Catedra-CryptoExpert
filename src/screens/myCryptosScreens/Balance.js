import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert
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
  const [cryptos, setCryptos] = useState([]);
  const [user,loading,error]=useAuthState(auth);
  
  const getInformation= async() => {
    try{      
      let array=[]
      await db.collection("cryptos").where("id_user","==",user.uid).orderBy("invest","desc").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          let obj = doc.data()
          array.push(obj);
          //console.info("Valor en for ="+JSON.stringify(obj))
        })
        console.info("Terminé, hoy guardaré en array.");
        setIsLoading(false);
        setCryptos(array);
      })
    }catch(err){
      console.error(err);
      ToastAndroid.show("Ocurrio un Error al Intentar Cargar Tu Información, Intenta de Nuevo", ToastAndroid.LONG);
    }
  }
  const updatePrices = async (oldCryptos) => {
    let newCryptos = []
    let coins = oldCryptos.map((item)=>(item.coinName)).join(",")
    console.log("Evaluando: " + coins)
    await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=usd`)
    .then(resp => resp.json())
    .then(data => {
      oldCryptos.map((obj) => {
        let price = data[obj.coinName].usd
        let newHoldings = Math.ceil((price * obj.holdingsBTC) * 100)/100
        console.log("Nuevo price: " + price + ", nuevo holdings: " + newHoldings)
        obj.holdings = newHoldings
        newCryptos.push(obj)
      })
      return newCryptos
    })
    .catch(e => {
      console.log("Error updatePrices: " + e);
    })
  }

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
  }

  useEffect(() => {
    if (!isLoading && cryptos.length != 0) {
      updatePrices(cryptos)
      .then((newCryptos) => {
        if (newCryptos != undefined) {
          setCryptos(newCryptos)
          // AQUI SE PUEDE IR A GUARDAR DE NUEVO A LA BASE
        }
      })
      .then(() => {
        calculateTotals()
      })
      .catch(e => {
        console.log(e)
      })
    }
  }, [cryptos])

  useEffect(() => {
    getInformation()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getInformation()
      console.log("getInformation?")
    });
    return unsubscribe;
  }, [navigation])

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
        isLoading={isLoading}
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
