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
import CustomButton from '../../components/CustomButton'

const Table = () => {
  return (
    <View>

    </View>
  );
}

const Balance = ({navigation}) => {
  const [filtro,setFiltro] = useState('');
  const [cryptos, setCryptos] = useState([
    {
      id: 1,
      code: 'BTC',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
      invest: 100,
      holdings: 135,
      holdingsBTC: 0.0022
    },
    {
      id: 2,
      code: 'ETH',
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
      invest: 20,
      holdings: 18.57,
      holdingsBTC: 0.00030
    }
  ]);

  return (
    <View style={styles.base}>
      <Text style={[styles.text,styles.title]}>Saldo actual</Text>
      
      <Text style={[styles.text,styles.balance]}>$ 100.55</Text>
      <View>
        <View style={styles.data}>
          <Text style={styles.text}>Total invertido:</Text>
          <Text style={styles.text}>$ 120</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.text}>Total Ganado/Perdido: </Text>
          <Text style={ false ? styles.textRed : styles.textGreen }>$ 33.57 (+22%)</Text>
        </View>
        <View style={styles.buttonPanel}>
          <View style={styles.filters}>
            <CustomButton
              title="BTC/USD"
              onPress={() => console.log('Filtrar por compras CUSTOM')}
            />
            <CustomButton
              title="1H"
              icon="arrow-drop-down"
              onPress={() => console.log('Filtrar por compras CUSTOM')}
            />
          </View>
          <CustomButton
              title="INVERTIR"
              icon="add"
              onPress={() => console.log('Filtrar por compras CUSTOM')}
            />
        </View>
      </View>
      <View style={styles.divider} />

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
    height: 15,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    marginBottom: 15
  },
});
