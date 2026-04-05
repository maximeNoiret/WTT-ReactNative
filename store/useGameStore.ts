import { create } from 'zustand';

interface GameState {
  score: number;
  currentRound: number;
  maxRounds: number;
  isPlaying: boolean;
  playlistId: string;
  startGame: (id: string) => void;
  addScore: (points: number) => void;
  nextRound: () => void;
  endGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  currentRound: 1,
  maxRounds: 10,
  isPlaying: false,
  playlistId: '',
  startGame: (id) => set({ score: 0, currentRound: 1, isPlaying: true, playlistId: id }),
  addScore: (points) => set((state) => ({ score: state.score + points })),
  nextRound: () => set((state) => ({ currentRound: state.currentRound + 1 })),
  endGame: () => set({ isPlaying: false }),
}));