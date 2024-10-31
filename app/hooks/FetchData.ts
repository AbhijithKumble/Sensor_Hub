import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import SensorData from '../screens/SensorData';
import Charts from '../screens/Charts';

const FetchData: React.FC = () => {
 const [axData, setAxData] = useState<number>([]);

  const fetchData = useCallback(async () => {
    try {
      const userId = auth().currentUser?.uid;
      if (!userId) {
        console.error('User ID is not available');
        return;
      }

      const response = await axios.get<{ data: SensorDataResponse[] }>(
        'http://10.0.2.2:8000/get_data',
        { params: { userid: userId } }
      );

      const axValues = response.data.data.map(item => item.ax);
      setAxData(axValues);

    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
  }, []);

  return (
    <View style={styles.container}>
      <SensorData onDataFetched={handleDataFetched} />
      <Charts axData={axData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default FetchData;
