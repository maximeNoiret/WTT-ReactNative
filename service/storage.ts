import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@wtt_history';

export interface GameRecord {
  id: string;
  date: string;
  score: number;
  playlistId: string;
}

export const storageService = {
  saveGame: async (score: number, playlistId: string) => {
    const newRecord: GameRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      score,
      playlistId
    };
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const history = existing ? JSON.parse(existing) : [];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([newRecord, ...history]));
  },
  getHistory: async (): Promise<GameRecord[]> => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
};