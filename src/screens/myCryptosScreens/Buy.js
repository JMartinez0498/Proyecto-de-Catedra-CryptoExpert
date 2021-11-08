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
  ActivityIndicator
} from 'react-native';
import {colors} from '../../util/colors';
import CustomModal from '../../components/CustomModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {checkNumber} from '../../util/utilFunctions'

import { auth, save } from "../../firebase/firebase";

const Buy = () => {
  const [user, loading, error] = useAuthState(auth);

  const [toBuy, setToBuy] = useState(0)
  const [toBuyCoin, setToBuyCoin] = useState(0)
  const [date, setDate] = useState(new Date());
  const [validationStyle, setValidationStyle] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCoin, setSelectedCoin] = useState({
    id:1,
    name: "Bitcoin",
    symbol: "BTC",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
  })
  const [price, setPrice] = useState(0);
  const [showModal, setShowModal] = useState(false)

  const getCoinPrice = async (coinId) => {
    await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`)
    .then(resp => resp.json())
    .then(data => {
      coinId = coinId.toLowerCase()
      let price = parseFloat(data[coinId].usd);
      setPrice(price)
      setToBuyCoin(convert(price))
    })
    .catch(e => { 
      console.log("Error getCoinPrices: " + e);
    })
  }

  const convert = (newPrice) => {
    let factor = price
    if (newPrice) {
      factor = newPrice
    }
    return parseFloat(toBuy / factor).toFixed(8);
  }

  useEffect(()=>{
    getCoinPrice(selectedCoin.name)
    setToBuy(toBuy)
    //setIsLoading(false)
  }, [selectedCoin])

  useEffect(()=>{
    if (parseFloat(toBuy) >= 0 && checkNumber(parseFloat(toBuy))) {
      setValidationStyle({color: colors.text})
      let conver = convert();
      if (conver == undefined) {
        setToBuyCoin(0)
      } else {
        setToBuyCoin(conver)
      }
    } else {
      if (toBuy == "") {
        setValidationStyle({color: colors.text})
        setIsValid(true)
      } else {
        setValidationStyle({color: colors.red})
        setIsValid(false)
        ToastAndroid.show("Valor no válido", ToastAndroid.SHORT);
      }
    }
  }, [toBuy, selectedCoin])

  const buy = () => {
    console.log(isValid && toBuy != "" && parseFloat(toBuy) > 0)

    if (isValid && toBuy != "" && parseFloat(toBuy) > 0) {
      save("trading", {
        coin: selectedCoin.symbol,
        invested: toBuy,
        bought: toBuyCoin,
        type: 1,
        date: date,
        user_id: user.uid
      })
      .catch(e => {
        console.log("Error guardando compra: " + e)
      })
    }
  }

  return (
    <ScrollView style={styles.base}>
      <View>
        <Text style={[styles.text,styles.title]}>Total a comprar en USD</Text>
        <View style={styles.inputForm}>
          <Text style={styles.tag}>$</Text>
          <TextInput
            style={[styles.input, validationStyle]}
            autoFocus={true}
            keyboardType="numeric"
            onChangeText={val => setToBuy(val)}
            value={toBuy.toString()}
          />
        </View>
        <View style={styles.divider} />
      </View>
      <View>
        <Text style={[styles.text,styles.title]}>Cantidad a comprar</Text>
        <View style={styles.inputForm}>
          <TextInput
            style={styles.input}
            editable={false}
            onChangeText={val => setToBuyCoin(val)}
            value={toBuyCoin.toString()}
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
          title="Comprar"
          onPress={() => buy()}
          disabled={!isValid}
          color={colors.button}
        />
      </View>
    </ScrollView>
  );
}

export default Buy;

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
