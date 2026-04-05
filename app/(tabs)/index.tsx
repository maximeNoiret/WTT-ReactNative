import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '../../store/useGameStore';

const CATEGORIES = [
  { id: '5233736826', title: 'Top Hits Pop', color: '#1DB954', icon: '🌟' }, // Playlist: Pop Hits
  { id: '1404470955', title: 'Rap Français', color: '#E21B3C', icon: '🎤' }, // Playlist: Rap FR Hits
  { id: '1306931615', title: 'Classiques Rock', color: '#1368CE', icon: '🎸' }, // Playlist: Rock Essentials
  { id: '1163842311', title: 'Années 80', color: '#D89E00', icon: '🕺' }, // Playlist: En mode 80
  { id: '613860315', title: 'Disney', color: '#9B59B6', icon: '🏰' }, // TA PLAYLIST !
  { id: '1060975211', title: 'Tubes Inoubliables', color: '#34495E', icon: '🕰️' }, // Playlist: Classiques FR & US
];

export default function HomeScreen() {
  const router = useRouter();
  const startGame = useGameStore((state) => state.startGame);

  const handleSelectCategory = (playlistId: string) => {
    startGame(playlistId); 
    router.push('/game');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What's The Track</Text>
        <Text style={styles.subtitle}>Choisissez un thème pour commencer</Text>
      </View>

      <View style={styles.grid}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity 
            key={cat.id} 
            style={[styles.card, { backgroundColor: cat.color }]}
            onPress={() => handleSelectCategory(cat.id)}
          >
            <Text style={styles.cardIcon}>{cat.icon}</Text>
            <Text style={styles.cardTitle}>{cat.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' },
  header: { padding: 30, paddingTop: 60, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '900', color: '#111' },
  subtitle: { fontSize: 16, color: '#666', marginTop: 5 },
  
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    padding: 15 
  },
  card: {
    width: '48%',
    height: 150,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardIcon: { fontSize: 40, marginBottom: 10 },
  cardTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }
});