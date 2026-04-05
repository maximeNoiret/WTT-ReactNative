import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { storageService, GameRecord } from '../../service/storage';
import { useIsFocused } from '@react-navigation/native';

export default function HistoryScreen() {
  const [data, setData] = useState<GameRecord[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) storageService.getHistory().then(setData);
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
            <Text style={styles.score}>{item.score} pts</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#F8F8F8' },
  title: { fontSize: 32, fontWeight: '900', marginTop: 40, marginBottom: 20 },
  row: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },
  date: { fontSize: 16, color: '#666' },
  score: { fontSize: 18, fontWeight: 'bold' }
});