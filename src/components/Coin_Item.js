import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Image} from 'react-native'
import {colors} from '../util/colors';

const Coin_Item=(props)=>{

    const [priceChange, setPriceChange] = useState(0)

    const priceFormat = () =>{
        setPriceChange(props.coin.item.price_change_percentage_24h)
        return priceChange
      }

      useEffect(()=>{
        priceFormat()
      }, [])

return(
    <View style={styles.containerItem}>
        <View style={styles.name}>
            <Image 
                style={styles.image}
                source={{uri: props.coin.item.image }}
            />
            <Text style={styles.coinSymbol}>{props.coin.item.symbol}</Text>
        </View>
        <Text style={styles.text}>${props.coin.item.current_price}</Text>
        <Text style={styles.text}>{priceChange.toFixed(2)}%</Text>
        <Text style={styles.text}>${props.coin.item.market_cap}</Text>
    </View>
)
}

export default Coin_Item


const styles = StyleSheet.create({

    containerItem:{
        paddingTop:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#fff',
        borderBottomWidth: 0.5,
    },

    name:{
        flexDirection: 'column',
        width: 65,
        backgroundColor:'orange',
    },

    text: {
      color: colors.text,
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