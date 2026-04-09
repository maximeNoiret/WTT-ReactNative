import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' },
  header: { padding: 30, paddingTop: 60, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '900', color: '#111' },
  subtitle: { fontSize: 16, color: '#666', marginTop: 5 },
  
  actionButtons: { flexDirection: 'row', gap: 10, marginTop: 15 },
  actionBtn: { paddingVertical: 8, paddingHorizontal: 15, backgroundColor: '#E0E0E0', borderRadius: 20 },
  actionBtnText: { fontWeight: '600', color: '#333' },
  historyBtn: { backgroundColor: '#111' },
  historyBtnText: { color: '#FFF' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 15 },
  
  card: { width: '48%', height: 150, borderRadius: 15, padding: 15, marginBottom: 15, justifyContent: 'center', alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  cardIcon: { fontSize: 40, marginBottom: 10 },
  cardTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },

  customCard: { width: '100%', height: 'auto', backgroundColor: '#222', paddingVertical: 20, alignItems: 'stretch' },
  customCardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 5 },
  customCardIcon: { fontSize: 28 },
  customCardTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  customSubtitle: { color: '#AAA', fontSize: 13, textAlign: 'center', marginBottom: 15 },
  
  inputRow: { flexDirection: 'row', gap: 10 },
  input: { flex: 1, backgroundColor: '#FFF', paddingHorizontal: 15, paddingVertical: 12, borderRadius: 10, fontSize: 16, color: '#111' },
  playCustomBtn: { backgroundColor: '#1DB954', paddingHorizontal: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
  playCustomBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});