export interface Track {
  id: number;
  title: string;
  artist: { name: string };
  preview: string; 
  album: { cover_medium: string };
}

const DEEZER_API_URL = 'https://api.deezer.com';

export const musicService = {
  getPlaylistTracks: async (playlistId: string): Promise<Track[]> => {
    try {
      const response = await fetch(`${DEEZER_API_URL}/playlist/${playlistId}`);
      const data = await response.json();
      
      if (!data.tracks || !data.tracks.data) {
        throw new Error('Impossible de charger cette playlist');
      }
      
      return data.tracks.data.filter((track: Track) => track.preview !== "");
    } catch (error) {
      console.error("Erreur API Deezer :", error);
      return [];
    }
  }
};