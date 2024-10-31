import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

type ChartsProps = {
route: {
params: {
axData: number[];
ayData: number[];
azData: number[];
};
};
};

const screenWidth = Dimensions.get('window').width;

const Charts: React.FC<ChartsProps> = ({ route }) => {
const { axData, ayData, azData } = route.params;

return (
    <ScrollView>
      <View>
        <Text>Accelerometer X</Text>
        <LineChart
          data={{
            datasets: [{ data: axData }],
          }}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2,
          }}
        />

        <Text>Accelerometer Y</Text>
        <LineChart
          data={{
            datasets: [{ data: ayData }],
          }}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2,
          }}
        />

        <Text>Accelerometer Z</Text>
        <LineChart
          data={{
            datasets: [{ data: azData }],
          }}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Charts;
