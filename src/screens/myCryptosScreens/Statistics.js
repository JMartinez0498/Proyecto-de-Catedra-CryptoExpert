import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {colors} from '../../util/colors';
import {
  VictoryBar,
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';

const Statitics = ({navigation}) => {
  let priceChange = 10;

  let invest = 1500;
  let holdings = 2500;


  return (
    <SafeAreaView style={styles.basearea}>
      <ScrollView>
        <View style={styles.based}>
        <View style={styles.basec}>
          <Text style={styles.title2}> $ {holdings}</Text>
        </View>
        <View style={styles.basec}>
      
        <View style={styles.baseb}>
          <Text style={priceChange > 0 ? styles.priceChange : styles.priceChangeNegative}>10%</Text>
        </View>
        </View></View>
        <VictoryChart theme={VictoryTheme.material} domainPadding={{x: 130}}>
          <VictoryBar
          barRatio={55}
            barWidth={({index}) => index * 2 + 70}
            style={{
              data: {fill: '#F4D35E'},
            }}
            data={[
              {x: 'Inversion', y: invest},
              {x: 'Cartera', y: holdings},
            ]}
          />
        </VictoryChart>
      </ScrollView>
    </SafeAreaView>
  );
};



export default Statitics;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 1,
    paddingVertical: 5,
  },
  baseb: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  basec: {
    flex: 1,
    
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  based: {
    flex: 1,
    backgroundColor: colors.background,
    borderBottomColor: colors.gray,
borderBottomWidth: 1,
borderTopColor: colors.gray,
borderTopWidth: 1,
    paddingHorizontal: 1,
    paddingVertical: 5,
  },
  basearea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: -130,
  },
  text: {
    color: colors.text,
    fontSize: 15,
    marginLeft: 5,
    marginBottom: 10,
    marginTop: 15,
  },
  texta: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 5,
    marginBottom: 10,
    marginTop: 15,
  },
  title: {
    color: colors.text,
    fontSize: 25,
    marginLeft: 10,
  },
  title2: {
 
    color: colors.text,
    fontSize: 30,
    marginLeft: 10,
  },
  button: {
    backgroundColor: colors.button,
  },
  card: {
    flex: 1,
    paddingBottom: 130,
  },
  chart: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    backgroundColor: colors.background,
    //paddingVertical: 180,
  },
  image: {
    height: 35,
    width: 35,
    marginLeft: -25,
  },
  texth: {
    color: colors.text,
    fontSize: 30,
    marginLeft: 5,
  },
  icon: {
    color: 'white',
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  containerb: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  priceChange: {
    color: 'rgb(102,184,93)',
    width: '25%',
    textAlign: 'left',
    //textAlignVertical: 'left',
  },

  priceChangeNegative: {
    color: 'red',
    width: '25%',
    textAlign: 'left',
    //textAlignVertical: 'left',
  },
});
