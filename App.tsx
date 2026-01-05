import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import axios from 'axios';

export default function App() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //   const { width, height } = Dimensions.get('window');
  //   const isTablet = Platform.OS === 'ios' && (Platform as any).isPad;

  useEffect(() => {
    // 백엔드 API 호출 (예시 URL - 본인 서버로 변경하세요!)
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://10.0.2.2:8080/android');

        // 예: 제목만 가져와서 표시
        setData(response.data);
      } catch (err: any) {
        setError('데이터를 불러오지 못했습니다: ' + err.message);
        Alert.alert('오류', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>'android에서 실행 중!'</Text>

      {loading && <ActivityIndicator size="large" color="#007AFF" />}

      {error && <Text style={styles.error}>{error}</Text>}

      {data && !loading && !error && (
        <View style={styles.dataContainer}>
          <Text style={styles.label}>서버에서 받은 데이터:</Text>
          <Text style={styles.data}>{data}</Text>
        </View>
      )}

      {!loading && !error && !data && (
        <Text style={styles.info}>데이터가 없습니다.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  data: {
    fontSize: 18,
    textAlign: 'center',
    color: '#007AFF',
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  info: {
    fontSize: 16,
    color: '#666',
  },
  dataContainer: {
    alignItems: 'center',
  },
});
