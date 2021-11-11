import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import {
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {colors} from '../../util/colors';
import CustomModal from '../../components/CustomModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {checkNumber} from '../../util/utilFunctions'

import { auth, save } from "../../firebase/firebase";

const Sell = ({navigation}) => {
  const [] = useState(100)
  const [user, loading, error] = useAuthState(auth);

  const [toSell, setToSell] = useState(0)
  const [toSellCoin, setToSellCoin] = useState(0)
  const [date, setDate] = useState(new Date());
  const [validationStyle, setValidationStyle] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState({
    id:1,
    name: "Bitcoin",
    symbol: "BTC",
    current_price: 66145,
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
  })
  const [coinData, setCoinData] = useState(0);
  const [showModal, setShowModal] = useState(false)

  const getCoinPrice = async (coinId) => {
    await fetch(`https://api.coingecko.com/api/v3/coins/markets?ids=${coinId.toLowerCase()}&vs_currency=usd`)
    .then(resp => resp.json())
    .then(data => {
      let price = parseFloat(data[0].current_price);
      setCoinData(data[0])
      setToSellCoin(convert(price))
    })
    .catch(e => { 
      console.log("Error getCoinPrices: " + e);
    })
  }

  const convert = (newPrice) => {
    let factor = coinData.current_price
    if (newPrice) {
      factor = newPrice
    }
    return parseFloat(toSell / factor).toFixed(8);
  }

  useEffect(()=>{
    getCoinPrice(selectedCoin.name)
    setToSell(toSell)
    //setIsLoading(false)
  }, [selectedCoin])

  useEffect(()=>{
    if (parseFloat(toSell) >= 0 && checkNumber(parseFloat(toSell))) {
      setValidationStyle({color: colors.text})

      // Validacion que no sea más de lo poseido

      let conver = convert();
      if (conver == undefined) {
        setToSellCoin(0)
      } else {
        setToSellCoin(conver)
      }
    } else {
      if (toSell == "") {
        setValidationStyle({color: colors.text})
        setIsValid(true)
      } else {
        setValidationStyle({color: colors.red})
        setIsValid(false)
        ToastAndroid.show("Valor no válido", ToastAndroid.SHORT);
      }
    }
  }, [toSell, selectedCoin])

  const sell = () => {

    if (isValid && toSell != "" && parseFloat(toSell) > 0) {
      save("trading", {
        coin: selectedCoin.symbol,
        invested: parseFloat(toSell),
        bought: parseFloat(toSellCoin),
        type: 2,
        date: date,
        user_id: user.uid
      })
      .then(()=>{
        save("cryptos", {
          coin: selectedCoin.symbol,
          image: coinData.image,
          invest: parseFloat(toBuy),
          profit: 0,
          holdings: parseFloat(toBuy),
          holdingsBTC: parseFloat(toBuyCoin),
          id_user: user.uid
        })
      })
      .then(()=>{
        navigation.navigate("MyCryptosStack")
      })
      .catch(e => {
        console.log("Error guardando venta: " + e)
      })
    }
  }

  return (
    <ScrollView style={styles.base}>
      <View>
        <Text style={[styles.text,styles.title]}>Saldo disponible</Text>
        <View style={[styles.inputForm,{justifyContent:'flex-end'}]}>
          <Text style={[styles.tag,{color:colors.textDisabled}]}>$ 155</Text>
        </View>
        <View style={styles.divider} />
      </View>
      <View>
        <Text style={[styles.text,styles.title]}>Total a vender en USD</Text>
        <View style={styles.inputForm}>
          <Text style={styles.tag}>$</Text>
          <TextInput
            style={[styles.input, validationStyle]}
            keyboardType="numeric"
            onChangeText={val => setToSell(val)}
            value={toSell.toString()}
          />
        </View>
        <View style={styles.divider} />
      </View>
      <View>
        <Text style={[styles.text,styles.title]}>Cantidad a vender</Text>
        <View style={styles.inputForm}>
          <TextInput
            style={styles.input}
            editable={false}
            onChangeText={val => setToSellCoin(val)}
            value={toSellCoin.toString()}
          />
          <TouchableOpacity
            style={styles.select}
            onPress={()=> setShowModal(true)}
          >
            <Text style={styles.selectText}>{selectedCoin.symbol.toUpperCase()}</Text>
            <MaterialIcons 
              name="arrow-drop-down"
              color={colors.text}
              size={30}
            /> 
          </TouchableOpacity>
          <CustomModal 
            visible={showModal}
            setVisibility={setShowModal}
            setCoin={setSelectedCoin}
          />
        </View>
        <View style={styles.divider} />
      </View>
      <View style={styles.factorInfo} >
        <Text style={styles.text}>
          {"1 " + selectedCoin.symbol.toUpperCase() + " = $" +  selectedCoin.current_price}
        </Text>
      </View>
      <View style={styles.buttonPanel}>
        <Button
          title="Vender"
          onPress={() => sell()}
          disabled={!isValid}
          color={colors.button}
        />
      </View>
    </ScrollView>
  );
}


export default Sell;

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
  title: {
    fontSize: 12,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingVertical: 5
  },
  inputForm: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tag: {
    fontSize: 40,
    color: colors.text,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 40,
    paddingVertical: 0,
    color: colors.text,
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectText: {
    fontSize: 40,
    color: colors.accent,
    fontWeight: 'bold'
  },
  buttonPanel: {
    marginVertical: 50,
    paddingHorizontal:30
  },
  divider: {
    height: 5,
    paddingBottom: 15,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  factorInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  }
});
