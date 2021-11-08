import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity} from 'react-native';
import {colors} from '../../util/colors';
import CustomModal from '../../components/CustomModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {checkNumber} from '../../util/utilFunctions'

const Sell = () => {
  const [toBuy, setToBuy] = useState(0)
  const [toBuyCoin, setToBuyCoin] = useState(0)
  const [date, setDate] = useState(new Date());
  const [validationStyle, setValidationStyle] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState({
    id:1,
    name: "Bitcoin",
    symbol: "BTC",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
  })
  const [price, setPrice] = useState(0);
  const [showModal, setShowModal] = useState(false)


  return (
    <View style={styles.base}>
      <Text style={styles.text}>VENDER</Text>
    </View>
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
  }
});
