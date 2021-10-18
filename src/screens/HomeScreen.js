import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {colors} from '../util/colors';
import Coin_Item from '../components/Coin_Item';


const Home = () => {

  const [coins, setCoins] = useState([])

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
      <View style={styles.container}>
        <Text style={styles.name}>Moneda</Text>
        <Text style={styles.price}>Precio</Text>
        <Text style={styles.priceChange}>Estado</Text>
        <Text style={styles.marketCap}>Cap. Mercado</Text>
      </View>
      <FlatList
        data={coins}
        renderItem={(item)=>{
          return (
            <Coin_Item coin={item} />
          )
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;

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

  container:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  
  name:{
    color: colors.text,
    flexDirection: 'column',
    width: '15%',
    textAlign: 'center',
},

price: {
    color: colors.text,
    width: '25%',
    textAlign: 'center',
}, 

priceChange: {
    color: colors.text,
    width: '25%',
    textAlign: 'center',
},

marketCap: {
    color: colors.text,
    width: '35%',
    textAlign: 'center',
  }, 
});
