import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av'; // 🎵 Import de l'audio
import { useGameStore } from '../store/useGameStore';
import { musicService, Track } from '../service/api';

// Les couleurs classiques de Kahoot pour les 4 boutons
const KAHOOT_COLORS = ['#E21B3C', '#1368CE', '#D89E00', '#26890C'];

export default function GameScreen() {
  const router = useRouter();
  const { score, currentRound, maxRounds, playlistId, addScore, nextRound, endGame } = useGameStore();

  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [choices, setChoices] = useState<Track[]>([]);

  useEffect(() => {
    async function loadGame() {
      setLoading(true);
      const fetchedTracks = await musicService.getPlaylistTracks(playlistId);
      const shuffled = fetchedTracks.sort(() => 0.5 - Math.random()).slice(0, maxRounds);
      setTracks(shuffled);
      setLoading(false);
    }
    loadGame();
  }, [maxRounds]);

  useEffect(() => {
    if (tracks.length === 0) return;

    const currentTrack = tracks[currentRound - 1];

    const wrongAnswers = tracks
      .filter((t) => t.id !== currentTrack.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    const allChoices = [currentTrack, ...wrongAnswers].sort(() => 0.5 - Math.random());
    setChoices(allChoices);

    async function playMusic() {
      try {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: currentTrack.preview },
          { shouldPlay: true }
        );
        setSound(newSound);
      } catch (error) {
        console.error("Erreur de lecture audio", error);
      }
    }
    playMusic();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentRound, tracks]); 


  const handleAnswer = async (selectedTrackId: number) => {
    const currentTrack = tracks[currentRound - 1];

    // 1. On coupe le son immédiatement
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }

    // 2. On vérifie si c'est la bonne réponse
    if (selectedTrackId === currentTrack.id) {
      addScore(10); // Bonne réponse !
    }

    // 3. On passe à la suite
    if (currentRound < maxRounds) {
      nextRound();
    } else {
      endGame();
      router.replace('/(tabs)'); // Fin du jeu
    }
  };

  // Écrans de chargement et d'erreur (identiques à avant)
  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /><Text>Chargement...</Text></View>;
  if (tracks.length === 0) return <View style={styles.center}><Text>Erreur réseau</Text></View>;

  // ÉCRAN DE JEU STYLE KAHOOT
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Manche {currentRound}/{maxRounds}</Text>
        <Text style={styles.headerText}>Score : {score}</Text>
      </View>

      {/* ZONE CENTRALE (Animation / Icône) */}
      <View style={styles.gameArea}>
        <Text style={styles.musicIcon}>🎵</Text>
        <Text style={styles.listenText}>Écoutez l'extrait...</Text>
      </View>

      {/* GRILLE DES 4 RÉPONSES */}
      <View style={styles.choicesContainer}>
        {choices.map((track, index) => (
          <TouchableOpacity 
            key={track.id} 
            style={[styles.choiceBtn, { backgroundColor: KAHOOT_COLORS[index] }]}
            onPress={() => handleAnswer(track.id)}
          >
            <Text style={styles.choiceText} numberOfLines={2}>
              {track.artist.name} - {track.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  headerText: { fontSize: 18, fontWeight: 'bold' },
  
  gameArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  musicIcon: { fontSize: 100, marginBottom: 10 },
  listenText: { fontSize: 20, fontWeight: '600', color: '#333' },
  
  choicesContainer: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap', // Permet de faire une grille 2x2
    justifyContent: 'space-between',
  },
  choiceBtn: {
    width: '48%', // Prend presque la moitié de l'écran pour en mettre 2 par ligne
    height: 120, // Des gros boutons faciles à toucher
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    elevation: 3, // Ombre sur Android
    shadowColor: '#000', // Ombre sur iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  choiceText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});