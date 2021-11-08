import React, { useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import axios from 'axios';
import News from '../components/News';

import {colors} from '../util/colors';

const NewsScreen = () => {

  const [datos, setDatos] = useState([])

  const loadData = async () =>{
    const res = await fetch("https://newsapi.org/v2/everything?q=bitcoin&from=2021-11-07&to=2021-11-07&sortBy=popularity&apiKey=f43b37842fe54e40970127723ee95818");
    const data = await res.json()
    setDatos(JSON.stringify(data))
    console.log(datos)
  }

  useEffect(()=>{
    loadData()
  }, [])


  return (
    <View style={styles.base}>
      <News />
    </View>
  );
};

export default NewsScreen;

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
});
