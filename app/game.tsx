import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Timer } from '../components/game/Timer';
import { musicService, Track } from '../service/api';
import { storageService } from '../service/storage';
import { useGameStore } from '../store/useGameStore';
import { calculatePoints } from '../utils/scoreCalc';
import { shuffleArray } from '../utils/shuffle';

const COLORS = ['#E21B3C', '#1368CE', '#D89E00', '#26890C'];

export default function GameScreen() {
  const router = useRouter();
  const { score, currentRound, maxRounds, playlistId, addScore, nextRound, endGame } = useGameStore();
  
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [choices, setChoices] = useState<Track[]>([]);
  const startTime = useRef(0);

  useEffect(() => {
    async function load() {
      const data = await musicService.getPlaylistTracks(playlistId);
      setTracks(shuffleArray(data).slice(0, maxRounds));
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    if (tracks.length === 0) return;
    const current = tracks[currentRound - 1];
    
    const others = tracks.filter(t => t.id !== current.id);
    setChoices(shuffleArray([current, ...shuffleArray(others).slice(0, 3)]));

    async function play() {
      if (sound) await sound.unloadAsync();
      const { sound: s } = await Audio.Sound.createAsync({ uri: current.preview }, { shouldPlay: true });
      setSound(s);
      startTime.current = Date.now();
    }
    play();

    return () => { 
      if (sound) {
        sound.unloadAsync().catch(() => {});
      } 
    };
  }, [currentRound, tracks]);

  const handleAnswer = async (id: number) => {
    if (sound) {
      try {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          await sound.stopAsync();
          await sound.unloadAsync();
        }
      } catch (error) {
        console.log("Son ignoré (pas encore chargé ou déjà coupé)");
      }
      setSound(null);
    }
    
    if (id !== -1 && id === tracks[currentRound - 1].id) {
      const elapsed = (Date.now() - startTime.current) / 1000;
      addScore(calculatePoints(30 - elapsed, 30));
    }

    if (currentRound < maxRounds) {
      nextRound();
    } else {
      await storageService.saveGame(score, playlistId);
      endGame();
      router.replace('./ad');
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (tracks.length === 0) return <View style={styles.center}><Text style={{ color: 'red' }}>Erreur réseau.</Text></View>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.info}>Round {currentRound}/{maxRounds}</Text>
        <Text style={styles.info}>Score: {score}</Text>
      </View>

      <Timer keyProp={currentRound} duration={30} onTimeUp={() => handleAnswer(-1)} />

      <View style={styles.main}>
        <Text style={styles.icon}>🎵</Text>
      </View>

      <View style={styles.grid}>
        {choices.map((c, i) => (
          <TouchableOpacity key={c.id} style={[styles.btn, { backgroundColor: COLORS[i] }]} onPress={() => handleAnswer(c.id)}>
            <Text style={styles.btnText}>{c.artist.name} - {c.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  center: { flex: 1, justifyContent: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 60 },
  info: { fontSize: 20, fontWeight: 'bold' },
  main: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 80 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, justifyContent: 'space-between' },
  btn: { width: '48%', height: 120, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 15, padding: 10 },
  btnText: { color: '#FFF', fontWeight: 'bold', textAlign: 'center' }
});