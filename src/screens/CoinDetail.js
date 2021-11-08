import React from 'react';
import moment from 'moment';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';

import {colors} from '../util/colors';
import HeaderBar from '../components/HeaderBar';
import {ScrollView} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {
  VictoryBar,
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel
} from 'victory-native';

const CoinDetail = ({route, navigation}) => {
  const [selectedCurrency, setSelectedCurrency] = React.useState();
  const [price,setPrice]=React.useState([]);  
  React.useEffect(() => {
    const {currency} = route.params;
    setSelectedCurrency(currency);
    currency["item"]["sparkline_in_7d"]["price"].forEach(function (value,i){
      let price_spark={
        hour: i,
        price:value
      }           
      setPrice(price=>[...price,price_spark]);
    })
    
    console.log(route.params);
  }, [selectedCurrency]);

  const imageUrl = JSON.stringify(selectedCurrency?.item.image);
  const string = imageUrl?.replace(/['"{}]/g, '');

  //** Arreglo de datos para dar formato x,y a los valores obtenidos desde la api para crear grafica de los ultimos 7 dias **//

  function renderHeader() {
    return (
      <View style={styles.base}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            alignItems: 'flex-start',
          }}>
          <View>
            <View style={styles.base}>
              <View style={styles.containerb}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={styles.texth}>
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      style={styles.icon}
                      size={20}
                    />{' '} {selectedCurrency?.item.name} ({selectedCurrency?.item.symbol})                         </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderChart() {
    return (
      <View style={styles.base}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            alignItems: 'flex-start',
          }}>
          <View>
            <View style={styles.base}>
              <View style={styles.container}></View>
            </View>
  
          </View>
          <Text style={styles.title2}>  <Image source={{uri: string}} style={styles.image} />    ${selectedCurrency?.item.current_price}      </Text>

        </View>
        <View style={styles.chart}>
          <VictoryChart
          
            width={375}
            domain={{x: [0,167]}}
            theme={VictoryTheme.material}>
            <VictoryLine
              data={price}
              style={{
                data: {stroke: '#FFFF00'},
                parent: {border: '1px solid #fff'},
              }}
              x="day"
              y="price"
            />
          </VictoryChart>
        </View>
        <Text>{}</Text>
        <Text>{}</Text>
        <Text style={styles.text}>Otros datos</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.baseb}>
            <Text style={styles.text}>Precio</Text>
            <Text style={styles.text}>Cap. de Mercado</Text>
            <Text style={styles.text}>Volumen</Text>
            <Text style={styles.text}>Ranking en Mercado</Text>
          </View>
          <View style={styles.basec}>
            <Text style={styles.text}>
              ${selectedCurrency?.item.current_price}
            </Text>
            <Text style={styles.text}>
              ${selectedCurrency?.item.market_cap}
            </Text>
            <Text style={styles.text}>
              ${selectedCurrency?.item.total_volume}
            </Text>
            <Text style={styles.text}>
              {selectedCurrency?.item.market_cap_rank}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.basearea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>{renderHeader()}</View>
        <View style={styles.card}>{renderChart()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CoinDetail;

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
    flexDirection: 'column',
    alignItems: 'flex-end',
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
});
