import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {colors} from '../util/colors';
import Coin_Search from '../components/Coin_Search';
import { TextInput } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderBar from '../components/HeaderBar';

export default function Search({props,navigation}) {

    const [coins, setCoins] = useState([])
    const [search, setSearch] = useState('busqueda')
    const [textInput, setTextInput] = useState()
    

    const changeHandler = (value) => {
      setTextInput(value);
      setSearch(value)
     }

    const cleantHandler = () => {
      setTextInput('')
      setSearch('busqueda') 
     }

  const loadData = async () =>{
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d");
    const data = await res.json()
    setCoins(data)
  }

  useEffect(()=>{
    loadData()
  }, [])

  return (
    <View style={styles.base}>
      <HeaderBar />
      <View style={styles.title}>
        <View>
        <TouchableOpacity
        onPress={cleantHandler}
        >
          <FontAwesome
                  name={search==='busqueda'?  "search" :"x"}
                  color={colors.text}
                  size={30}
          />
        </TouchableOpacity>
        </View>
        <TextInput style={styles.input} 
          onChangeText={newSearch => newSearch===''? cleantHandler() : changeHandler(newSearch)}
          value={textInput}
        />
      </View>
      <FlatList
        data={coins.filter(
          (coin) => 
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
          )
        }
        renderItem={(item)=>{
          return (
            <TouchableOpacity
              //onPress={() =>navigation.navigate("CoinStack", {currency : item})}
             
              onPress={() =>navigation.navigate("CoinStack", {currency : item})}
              //onPress={() =>console.log(item)}
             
              
            >
              <Coin_Search coin={item} />
            </TouchableOpacity>
          )
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  base:{
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  lista:{
    backgroundColor: 'red'
  },

    input:{
      borderBottomColor: 'white',
      borderBottomWidth: 1,
      width: '80%',
      color: colors.text,
    },

    title:{
      flexDirection:'row',
      left: '1%',
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