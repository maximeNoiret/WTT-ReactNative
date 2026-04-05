export interface Track {
  id: number;
  title: string;
  artist: { name: string };
  preview: string; 
  album: { cover_medium: string };
}

const DEEZER_API_URL = 'https://api.deezer.com';

export const musicService = {
  // On repasse en mode ID de playlist numérique
  getPlaylistTracks: async (playlistId: string): Promise<Track[]> => {
    try {
      const response = await fetch(`${DEEZER_API_URL}/playlist/${playlistId}`);
      const data = await response.json();
      
      // On fouille dans la vraie playlist
      if (!data.tracks || !data.tracks.data) {
        throw new Error('Impossible de charger cette playlist');
      }

      // On filtre pour garder les musiques avec un extrait valide
      return data.tracks.data.filter((track: Track) => track.preview !== "");
    } catch (error) {
      console.error("Erreur API Deezer :", error);
      return [];
    }
  }
};