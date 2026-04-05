import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Règles du jeu</Text>
      
      <View style={styles.rulesBox}>
        <Text style={styles.ruleText}>🎵 10 manches par partie.</Text>
        <Text style={styles.ruleText}>⏱️ Tu as 30 secondes pour répondre.</Text>
        <Text style={styles.ruleText}>🚀 Plus tu réponds vite, plus tu gagnes de points (jusqu'à 1000 pts par manche) !</Text>
      </View>

      {/* NOUVEAU : Le bouton pour fermer la modale */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backBtnText}>Fermer et retourner au menu</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', alignItems: 'center', padding: 30 },
  title: { fontSize: 28, fontWeight: '900', marginBottom: 30, marginTop: 40 },
  rulesBox: { backgroundColor: '#F2F2F2', padding: 25, borderRadius: 15, width: '100%', marginBottom: 30 },
  ruleText: { fontSize: 16, marginBottom: 15, lineHeight: 24, fontWeight: '500' },
  
  backBtn: { backgroundColor: '#111', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 30, width: '100%', alignItems: 'center' },
  backBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});