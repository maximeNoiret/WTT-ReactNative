import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../../assets/styles/index.style';
import { useGameStore } from '../../store/useGameStore';

const CATEGORIES = [
  { id: '5233736826', title: 'Top Hits Pop', color: '#1DB954', icon: '🌟' },
  { id: '1404470955', title: 'Rap Français', color: '#E21B3C', icon: '🎤' },
  { id: '1306931615', title: 'Classiques Rock', color: '#1368CE', icon: '🎸' },
  { id: '1163842311', title: 'Années 80', color: '#D89E00', icon: '🕺' },
  { id: '613860315', title: 'Disney', color: '#9B59B6', icon: '🏰' },
  { id: '1060975211', title: 'Tubes Inoubliables', color: '#34495E', icon: '🕰️' },
];

export default function HomeScreen() {
  const router = useRouter();
  const startGame = useGameStore((state) => state.startGame);
  
  const [customId, setCustomId] = useState('');

  const handleSelectCategory = (playlistId: string) => {
    startGame(playlistId); 
    router.push('/game');
  };

  const handleCustomPlay = () => {
    if (!customId.trim()) {
      Alert.alert("Oups ! 🎵", "Veuillez entrer un ID de playlist Deezer.");
      return;
    }
    startGame(customId.trim());
    router.push('/game');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What's The Track</Text>
        <Text style={styles.subtitle}>Choisissez un thème pour commencer</Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/modal')}>
            <Text style={styles.actionBtnText}>📖 Règles du jeu</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, styles.historyBtn]} onPress={() => router.push('/history')}>
            <Text style={[styles.actionBtnText, styles.historyBtnText]}>🏆 Mon Historique</Text>
          </TouchableOpacity>
        </View>
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

        <View style={[styles.card, styles.customCard]}>
          <View style={styles.customCardHeader}>
            <Text style={styles.customCardIcon}>🎧</Text>
            <Text style={styles.customCardTitle}>Personnalisé</Text>
          </View>
          <Text style={styles.customSubtitle}>Colle l'ID d'une playlist Deezer :</Text>
          
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Ex: 1404470955"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={customId}
              onChangeText={setCustomId}
            />
            <TouchableOpacity style={styles.playCustomBtn} onPress={handleCustomPlay}>
              <Text style={styles.playCustomBtnText}>Go !</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <View style={{ height: 40 }} /> 
    </ScrollView>
  );
}