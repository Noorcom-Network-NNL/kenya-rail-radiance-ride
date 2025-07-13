export interface JamendoTrack {
  id: string;
  name: string;
  duration: number;
  artist_name: string;
  album_name: string;
  image: string;
  audio: string;
  audiodownload: string;
}

export interface JamendoResponse {
  results: JamendoTrack[];
}

export const jamendoGenres = {
  'all': '',
  'classical': 'classical',
  'popular': 'pop',
  'rock': 'rock',
  'folk': 'folk'
};

// Mock data for demonstration
const mockTracks: JamendoTrack[] = [
  {
    id: '1',
    name: 'African Sunset',
    duration: 245,
    artist_name: 'Kenya Beats',
    album_name: 'Journey Through Africa',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    audiodownload: ''
  },
  {
    id: '2',
    name: 'Railway Rhythms',
    duration: 198,
    artist_name: 'Travel Harmonies',
    album_name: 'On The Move',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    audiodownload: ''
  },
  {
    id: '3',
    name: 'Peaceful Journey',
    duration: 312,
    artist_name: 'Serene Sounds',
    album_name: 'Relaxation',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    audiodownload: ''
  },
  {
    id: '4',
    name: 'Kenyan Folk Tales',
    duration: 267,
    artist_name: 'Cultural Heritage',
    album_name: 'Traditional Stories',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    audiodownload: ''
  },
  {
    id: '5',
    name: 'Classical Symphony',
    duration: 423,
    artist_name: 'Orchestra International',
    album_name: 'Grand Classics',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop',
    audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    audiodownload: ''
  }
];

export async function fetchJamendoTracks(
  genre: string = '', 
  limit: number = 20
): Promise<JamendoTrack[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Filter mock tracks by genre if specified
  let filteredTracks = mockTracks;
  if (genre && genre !== '') {
    filteredTracks = mockTracks.filter(track => 
      track.album_name.toLowerCase().includes(genre.toLowerCase()) ||
      track.name.toLowerCase().includes(genre.toLowerCase())
    );
  }
  
  return filteredTracks.slice(0, limit);
}

export async function searchJamendoTracks(query: string, limit: number = 20): Promise<JamendoTrack[]> {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const filteredTracks = mockTracks.filter(track =>
    track.name.toLowerCase().includes(query.toLowerCase()) ||
    track.artist_name.toLowerCase().includes(query.toLowerCase()) ||
    track.album_name.toLowerCase().includes(query.toLowerCase())
  );
  
  return filteredTracks.slice(0, limit);
}