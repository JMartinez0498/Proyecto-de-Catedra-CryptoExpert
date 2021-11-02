import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {colors} from '../util/colors';
import Coin_Item from '../components/Coin_Item';
import { TextInput } from 'react-native-gesture-handler';

export default function Search() {

    const [coins, setCoins] = useState([])
    const [search, setSearch] = useState('busqueda')

  const loadData = async () =>{
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
    const data = await res.json()
    setCoins(data)
  }

  useEffect(()=>{
    loadData()
  }, [])

  return (
    <View style={styles.base}>
      <TextInput style={styles.input} 
        onChangeText={newSearch => newSearch===''?  setSearch('busqueda') :setSearch(newSearch)}
      />
      <FlatList
        data={coins.filter(
          (coin) => 
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
          )
        }
        renderItem={(item)=>{
          return (
            <Coin_Item coin={item} />
          )
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({

    input:{
      borderBottomColor: 'white',
      borderBottomWidth: 2,
      width: '80%',
      color: colors.text,
    },


    base:{
        backgroundColor: colors.backgroundDark,
    },

    containerItem:{
        paddingTop:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#fff',
        borderBottomWidth: 0.5,
        marginHorizontal: 5,
    },

    name:{
        flexDirection: 'column',
        width: '15%',
        alignItems:'center',
    },

    price: {
        color: colors.text,
        width: '25%',
        textAlign: 'center',
        textAlignVertical: 'center',
    }, 

    priceChange: {
        color: 'rgb(102,184,93)',
        width: '25%',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    priceChangeNegative: {
        color: 'red',
        width: '25%',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    
    marketCap: {
        color: colors.text,
        width: '35%',
        textAlign: 'center',
        textAlignVertical: 'center',
      }, 
      

    coinSymbol:{
        textTransform: 'uppercase',
        color: colors.text,
    },

    image:{
        width:30,
        height:30,
    },
  });