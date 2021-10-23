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

import {
  VictoryBar,
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';

const CoinDetail = ({route, navigation}) => {
  const [selectedCurrency, setSelectedCurrency] = React.useState();
  React.useEffect(() => {
    const {currency} = route.params;
    setSelectedCurrency(currency);
    console.log(route.params);
  }, []);

  const imageUrl = JSON.stringify(selectedCurrency?.item.image);
  const string = imageUrl?.replace(/['"{}]/g, '');

  //** Arreglo de datos para dar formato x,y a los valores obtenidos desde la api para crear grafica de los ultimos 7 dias **//

  const data = [
    {day: 1, price: 61410},
    {day: 2, price: 60578},
    {day: 3, price: 61401},
    {day: 4, price: 57321},
    {day: 5, price: 57471},
    {day: 6, price: 56268},
    {day: 7, price: 56772},
  ];

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
            <Image source={{uri: string}} style={styles.image} />
          </View>
          <Text style={styles.title}>{selectedCurrency?.item.name}</Text>
          <Text style={styles.title}>({selectedCurrency?.item.symbol})</Text>
        </View>
        <View style={styles.chart}>
          <VictoryChart width={375} domain={{x: [7, 1]}} theme={VictoryTheme.material}>
            <VictoryLine
              data={data}
              style={{
                data: {stroke: '#FFFF00'},
                parent: {border: '1px solid #ccc'},
              }}
              x="day"
              y="price"
            />
          </VictoryChart>
        </View>

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
      <HeaderBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
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
    paddingHorizontal: 15,
    paddingVertical: 10,
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
  },
});
