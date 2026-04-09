import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AdScreen() {
  const router = useRouter();

  const closeAd = () => {
    router.replace('/(tabs)/history');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* La fameuse croix de fermeture en haut à gauche */}
      <TouchableOpacity style={styles.closeButton} onPress={closeAd}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.adTag}>SPONSORISÉ</Text>
        
        <Text style={styles.emoji}>🎓</Text>
        
        <Text style={styles.title}>PRÊT À CODER L'AVENIR ?</Text>
        
        <Text style={styles.description}>
          Rejoins le <Text style={styles.highlight}>B.U.T. Informatique</Text> !{"\n"}
          Deviens un expert du dev, de l'IA et de la cybersécurité.
        </Text>

        <TouchableOpacity style={styles.mainButton} onPress={() => alert("Direction l'IUT ! 🚀")}>
          <Text style={styles.mainButtonText}>POSTULER À L'IUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A1A' },
  closeButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  adTag: { color: '#FFD700', fontWeight: 'bold', fontSize: 12, marginBottom: 20, letterSpacing: 2 },
  emoji: { fontSize: 80, marginBottom: 20 },
  title: { color: '#FFF', fontSize: 32, fontWeight: '900', textAlign: 'center', marginBottom: 20 },
  description: { color: '#CCC', fontSize: 18, textAlign: 'center', lineHeight: 26, marginBottom: 40 },
  highlight: { color: '#007AFF', fontWeight: 'bold' },
  mainButton: { backgroundColor: '#007AFF', paddingVertical: 18, paddingHorizontal: 40, borderRadius: 30, width: '100%', alignItems: 'center' },
  mainButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});